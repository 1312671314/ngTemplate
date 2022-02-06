import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { EventsService } from 'src/app/modules/app/services/events.service';
import { Global } from 'src/app/modules/app/services/global.service';
import { NoticeService } from 'src/app/modules/app/services/notice.service';

@Component({
  selector: 'app-setting-message',
  templateUrl: './message.component.html'
})
export class SettingMessageComponent implements OnInit {
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  status: any;
  locationConfig: any;
  location: any;
  orgName: any;
  center: any;
  orgNum: any;
  orgSerial: any;
  operateId: any;
  operationList: any;
  operationMap: any;
  processTypeMap: any;
  userTypeMap: any;
  messageStatusMap: any;
  constructor(
    private enumService: EnumService,
    private global: Global,
    private router: Router,
    private modal: ModalHelper,
    private apiService: ApiService,
    private msg: NzMessageService,
    private events: EventsService,
    private noticeService: NoticeService
  ) {
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;
    this.status = '-1';
    this.operationMap = {};
    this.locationConfig = Global.getCityConfig();
    this.location = {
      provinceId: -1
    };
    this.teadList = [
      { name: '标题' },
      { name: '公司' },
      { name: '事件' },
      { name: '位置' },
      { name: '通知类型' },
      { name: '时间' },
      { name: '状态' },
      { name: '操作' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'title' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'eventName' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'subjectType' },
      { type: 'time', name: 'createTime' },
      { type: 'text', name: 'markReadText' },
      { type: 'buttonList', buttons: [{ text: '设置已读', index: 1 }] }
    ];
    this.dataSet = [];
    this.messageStatusMap = {};
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
      }
    });
  }

  ngOnInit(): void {
    this.getOperationList();
    this.messageStatusMap = this.enumService.messageStatausMap;
    this.userTypeMap = this.enumService.userTypeMap;
    this.processTypeMap = this.enumService.processTypeMap;

    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      accountId: this.global.getUserInfo().id
    };
    this.getData(data);
  }
  onLocationSelect(location: any) {
    this.location = location;
  }

  rest() {
    this.pageIndex = 1;
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      accountId: this.global.getUserInfo().id
    };
    this.getData(data);
  }

  getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.informSearch(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.subjectType = this.userTypeMap[element.messageType];
          element.markReadText = element.markRead ? '已读' : '未读';
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
      // this.informMarkRead();
    });
  }

  allread() {
    this.apiService.informMarkRead({ accountId: this.global.getUserInfo().id }).then(response => {
      if (response && response.success) {
        this.msg.success('操作成功');
        console.log('消息标记已读成功');
        this.sendNotice();
        this.search();
      } else {
        console.log('消息标记已读失败');
      }
    });
  }

  informMarkRead(data: any) {
    this.apiService.informMarkRead(data).then(response => {
      if (response && response.success) {
        this.msg.success('操作成功');
        console.log('消息标记已读成功');
        this.sendNotice();
        this.search();
      } else {
        console.log('消息标记已读失败');
      }
    });
  }

  sendNotice() {
    this.noticeService.sub.next('new');
  }

  export() {}

  search() {
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      accountId: this.global.getUserInfo().id
    };
    data = this.apiService.filterData(data);
    this.getData(data);
  }

  editFun(msg: any) {
    if (msg.markRead) {
      this.msg.info('消息已读');
    } else {
      this.informMarkRead({ idList: [msg.id] });
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  turnPage(page: any) {
    let data = {
      page: page - 1,
      size: this.pageSize,
      accountId: this.global.getUserInfo().id
    };
    this.getData(data);
  }
}
