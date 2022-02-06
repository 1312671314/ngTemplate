import { Injectable } from '@angular/core';
import { Global } from './global.service';
import { SocketConstants } from './socket.constant';
import { Subject, Observable } from 'rxjs';
import { EventsService } from './events.service';
import { Router } from '@angular/router';

@Injectable()
export class SocketHandler {
  static MESSAGE_TYPE = {
    Message: 'Message'
  };
  private socket: any;
  private subject: Subject<any>;
  private pingPongInterval: any;
  private isConnected: boolean;
  private messageQueue: string[];

  constructor(private global: Global, private events: EventsService, private router: Router) {
    this.messageQueue = [];
    this.isConnected = false;
    this.subject = new Subject<any>();
  }

  personAgree() {
    let isOk = false;
    if (Notification.permission != 'granted') {
      Notification.requestPermission(status => {
        //status是授权状态，如果用户允许显示桌面通知，则status为'granted'
        console.log('status: ' + status);
        //permission只读属性:
        //  default 用户没有接收或拒绝授权 不能显示通知
        //  granted 用户接受授权 允许显示通知
        //  denied  用户拒绝授权 不允许显示通知
        let permission = Notification.permission;
        console.log('permission: ' + permission);
        isOk = true;
      });
    } else if (window.Notification.permission == 'granted') {
      isOk = true;
    }
    return isOk;
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

  init(): void {
    this.personOk();
    this.socket = new WebSocket(Global.getApiHost().ws);
    this.isConnected = false;
    this.socket.onopen = (event: Event): any => {
      this.socket.send(
        JSON.stringify({
          token: this.global.getUserInfo().token
        })
      );
      this.subject.next({
        eventType: SocketConstants.WS_ONOPEN,
        event
      });
      this.isConnected = true;
      // this.events.publish(SocketHandler.EVENT_TYPE.onlineStatus, this.isConnected);
      if (this.messageQueue.length > 0) {
        for (const message of this.messageQueue) {
          this.socket.send(message);
        }
        this.messageQueue = [];
      }
    };
    this.socket.onmessage = (messageEvent: MessageEvent) => {
      this.subject.next({
        eventType: SocketConstants.WS_ONMESSAGE,
        messageEvent
      });
      this.personAgree();
      const event = JSON.parse(messageEvent.data);
      this.createWebkitNotification(event);
      this.events.broadcast(SocketHandler.MESSAGE_TYPE.Message, event);
    };
    this.socket.onclose = (event: CloseEvent): any => {
      this.init();
      this.isConnected = false;
      // this.events.publish(SocketHandler.EVENT_TYPE.onlineStatus, this.isConnected);
      this.subject.next({
        eventType: SocketConstants.WS_ONCLOSE,
        event
      });
    };
    this.socket.onerror = (event: Event): any => {
      this.isConnected = false;
      // this.events.publish(SocketHandler.EVENT_TYPE.onlineStatus, this.isConnected);
      this.subject.next({
        eventType: SocketConstants.WS_ONERROR,
        event
      });
      clearInterval(this.pingPongInterval);
    };
  }

  createWebkitNotification(msg: any) {
    // let push = JSON.parse(msg.data);
    let notification = new Notification(msg.title, {
      icon: '../../../../assets/logo.png',
      body: msg.title
      // data: push
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

  getSocket(): Observable<any> {
    return this.subject;
  }

  private sendMessage(message: string) {
    if (this.isConnected) {
      this.socket.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  // send(messageId: string,
  // 	messageType: string,
  // 	isGroup: boolean,
  // 	targetId: string,
  // 	content: string,
  // 	atList?: string[],
  // 	attachments?: any[],
  // ): ChatMessage {
  // 	const message = {
  // 		id: messageId,
  // 		type: SocketHandler.STATUS.MESSAGE,
  // 		operatorId: this.global.getUserInfo().id,
  // 	};
  // 	const extra = {
  // 		type: messageType,
  // 		content,
  // 	};
  // 	if (isGroup) {
  // 		message["targetGroupChatId"] = targetId;
  // 		if (atList && atList.length > 0) {
  // 			extra["atList"] = atList.join(",");
  // 		}
  // 	} else {
  // 		message["targetUserId"] = targetId;
  // 	}
  // 	if (attachments && attachments.length > 0) {
  // 		extra["attachments"] = attachments;
  // 	}
  // 	message["extra"] = JSON.stringify(extra);
  // 	this.sendMessage(JSON.stringify(message));
  // 	const cache = {
  // 		id: message.id,
  // 		type: messageType,
  // 		from: message.operatorId,
  // 		time: new Date().getTime(),
  // 		attachments: attachments ? attachments : [],
  // 		content: content,
  // 		deleted: false,
  // 		atList: atList ? atList.join(",") : "",
  // 		sending: true
  // 	};
  // 	if (isGroup) {
  // 		cache["groupChatId"] = targetId;
  // 	} else {
  // 		cache["to"] = targetId;
  // 	}
  // 	return cache;
  // }

  // changeTypingStatus(isTyping: boolean, targetId: string, isGroup: boolean) {
  // 	if (this.isConnected) {
  // 		const data = {
  // 			type: isTyping ? SocketHandler.STATUS.CHAT_TYPING : SocketHandler.STATUS.CHAT_SILENCE,
  // 			operatorId: this.global.getUserInfo().id
  // 		};
  // 		if (isGroup) {
  // 			data["targetGroupChatId"] = targetId;
  // 		} else {
  // 			data["targetUserId"] = targetId;
  // 		}
  // 		this.sendMessage(JSON.stringify(data));
  // 	}
  // }
}
