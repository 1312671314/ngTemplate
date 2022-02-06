import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EventsService } from 'src/app/modules/app/services/events.service';
import { Global } from 'src/app/modules/app/services/global.service';
import { NoticeService } from 'src/app/modules/app/services/notice.service';
import { SocketHandler } from 'src/app/modules/app/services/socket-handler.service';
@Component({
  selector: 'header-notify',
  template: `
    <!-- <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
      (popoverVisibleChange)="loadData()"
    ></notice-icon> -->
    <notice-icon
      [count]="count"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (click)="goNoticeList()"
    ></notice-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderNotifyComponent {
  public count;
  public loading = false;
  public ws: any;
  hanlder: (name: string, ...args: any[]) => void;
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private events: EventsService,
    private apiService: ApiService,
    private global: Global,
    private cdf: ChangeDetectorRef,
    private noticeService: NoticeService,
    private el: ElementRef
  ) {
    this.hanlder = (...args: any[]) => {
      this.onContentChange(args[0]);
    };
    this.events.on(SocketHandler.MESSAGE_TYPE.Message, this.hanlder);
    this.count = 0;

    // if (this.global.isLogin()) {
    //   if ('WebSocket' in window) {
    //     this.ws = new WebSocket(Global.getApiHost().ws);
    //   } else if ('MozWebSocket' in window) {
    //     // this.ws = new MozWebSocket(Global.getApiHost().this.ws);
    //   }
    //   this.ws.onopen = () => {
    //     console.log('is open');
    //     this.ws.send(
    //       JSON.stringify({
    //         token: this.global.getUserInfo().token
    //       })
    //     );
    //     this.personOk();
    //     this.informSearch();
    //     console.log('已经打开了websocket连接，可以进行实时通信了');
    //   };

    //   this.ws.onmessage = (e: any) => {
    //     console.log('接受到来自服务器端的数据:' + e.data);
    //     this.informSearch();
    //     this.createWebkitNotification(e);
    //     if (e.data == 'close') {
    //       //这里要注意onclose的第一个参数必须是1000或者3000—4999
    //       this.ws.onclose(1000, '服务器通知关闭');
    //     } else {
    //       console.log(e);
    //     }
    //   };
    //   this.ws.onerror = (e: any) => {
    //     console.log('websocket连接错误' + e.error);
    //     this.ws.close(3000, 'websocket连接异常导致的关闭');
    //   };
    //   this.ws.onclose = (e: any) => {
    //     console.log('websocket关闭连接:' + e.error);
    //   };
    // }
  }

  onContentChange(content: any) {
    this.informSearch();
  }

  noticeServiceInit() {
    // 小铃铛订阅消息
    this.noticeService.sub.subscribe((res: any) => {
      console.log('收到订阅消息');
      this.informSearch();
    });
  }

  informSearch() {
    this.apiService.countMarkRead({ accountId: this.global.getUserInfo().id }).then(response => {
      if (response && response.data) {
        this.count = response.data;
        this.cdf.markForCheck();
        this.cdf.detectChanges();
      } else {
        this.count = 0;
      }
      console.log(this.count);
    });
  }

  ngOnInit(): void {
    this.informSearch();
    this.noticeServiceInit();
  }

  ngOnDestroy() {
    this.events.destroyListener(SocketHandler.MESSAGE_TYPE.Message, this.hanlder);
  }

  personOk() {
    let isOk = false;
    if (Notification.permission != 'granted') {
      Notification.requestPermission(status => {
        //status是授权状态，如果用户允许显示桌面通知，则status为'granted'
        console.log('status: ' + status);
        let permission = Notification.permission;
        console.log('permission: ' + permission);
        isOk = true;
      });
    } else if (window.Notification.permission == 'granted') {
      isOk = true;
    }
    return isOk;
  }

  createWebkitNotification(msg: any) {
    let push = JSON.parse(msg.data);
    let notification = new Notification(push.title, {
      icon: '../../../../assets/logo.png',
      body: push.title,
      data: push
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
      this.router.navigate(['/setting/message']);
    };

    notification.onerror = function () {
      console.log('notification.onerror');
    };

    notification.onshow = function () {
      console.log('notification.onshow');
    };

    notification.onclose = function () {
      console.log('notification.onclose');
    };
  }

  goNoticeList() {
    this.router.navigate(['/setting/message']);
  }
}
