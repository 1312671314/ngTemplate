import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MdSnackBar, UNIQUE_SELECTION_DISPATCHER_PROVIDER } from '@angular/material';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Global } from './global.service';

@Injectable()
export class HttpHandler {
  public error: any;
  constructor(
    // public snackBar: MdSnackBar,
    private global: Global,
    private http: HttpClient,
    public msg: NzMessageService
  ) {}

  handleError(error: any): void {
    console.log(error);
    if (error) {
      try {
        if (error && JSON.stringify(error) == '{}') {
          return;
        }
        if (error.message == 'token失效' || 'token无效' == error.message || 'token失效' == error.message) {
          this.msg.create('error', '您的账号已在别处登录');
          setTimeout(() => {
            this.global.logout();
          }, 3000);
        } else if (error.message) {
          this.msg.create('error', error.message);
        } else {
          this.msg.create('error', '请求失败：');
        }
      } catch (e) {
        if (error.code == '202') {
          return error;
        } else if (error.message) {
          this.msg.create('error', error.message);
        }
      }
    }
  }

  get(url: string, header?: any): Promise<any> {
    return this.http
      .get(url, header)
      .toPromise()
      .then(
        response => {
          const data = response;
          return data;
        },
        response => {
          this.handleError(response);
        }
      )
      .catch(error => {
        if (error.message) {
          const data = error;
          return data;
        } else {
          this.handleError(error);
        }
      });
  }

  post(url: string, data: any, header?: any): Promise<any> {
    return this.http
      .post(url, data, header)
      .toPromise()
      .then(
        response => {
          const data = response;
          return data;
        },
        response => {
          if (response.status == 500 || response.status == 503) {
            const data = JSON.parse(response._body);
            if (data.message == '密码不正确') {
              return data;
            } else {
              if (data.code == '202') {
                return data;
              } else {
                this.handleError(data);
                return data;
              }
            }
          } else {
            this.handleError(response);
          }
        }
      )
      .catch(error => {
        if (error.status == 500 || error.status == 503) {
          const data = JSON.parse(error._body);
          return data;
        } else {
          this.handleError(error);
        }
      });
  }

  delete(url: string, header?: any): Promise<any> {
    return this.http
      .delete(url, header)
      .toPromise()
      .then(
        response => {
          const data = response;
          return data;
        },
        response => this.handleError(response)
      )
      .catch(error => this.handleError(error));
  }
}
