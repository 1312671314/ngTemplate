import { Response } from './respponse.type';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { Global } from './global.service';

@Injectable()
export class RequestErrorHandlerService {
  constructor(public msg: NzMessageService, private global: Global) {}
  async responseErrorHandler(response: Response<any>) {
    const toast = await this.msg.error('请求失败：' + response.message);
    switch (response.code) {
      case '4100':
        this.msg.error('请求失败：登录已过期，请重新登录');
        if (response.code === '4100') {
          this.global.logout();
        }
        break;
      default:
        this.msg.error('请求失败：' + response.message);
        break;
    }
    // await toast.present();
    // toast.onDidDismiss().then(() => {
    // });
  }

  async networkErrorHandler(error: any) {
    if (error) {
      try {
        if (error.status === 0) {
          const toast = await this.msg.error('请求失败：当前没有网络连接');
        } else {
          //   const toast = await this.msg.error({
          //     message: '请求失败：' + error.error.message,
          //     duration: 3000
          //   });
          // 	await toast.present();
          this.msg.error('请求失败：' + error.error.message);
        }
      } catch (e) {
        this.msg.error('请求失败：' + error.message);
        // const toast = await this.toastCtrl.create({
        //   message: error.message,
        //   duration: 3000
        // });
        // await toast.present();
      }
    }
  }
}
