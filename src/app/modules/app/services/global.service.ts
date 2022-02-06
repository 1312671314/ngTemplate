import { Injectable } from '@angular/core';
// import { Http } from "@angular/http";
import { LocalStorage } from './localStorage.service';
import { _HttpClient } from '@delon/theme';
@Injectable()
export class Global {
  private isCityLoaded: any;
  private static hostApi: any;
  private static cityConfig: any;
  private static dataPool: any;
  constructor(private http: _HttpClient) {
    if (!Global.cityConfig) {
      Global.cityConfig = { province: {} };
    }
  }

  private dev(): void {
    Global.hostApi = {};
    Global.hostApi.api = 'http://test.xiaoyee.tech/api/';
    Global.hostApi.ws = 'ws://test.xiaoyee.tech/task/ws/reg';
    Global.hostApi.task = 'http://test.xiaoyee.tech/task/';
  }

  private prod(): void {
    Global.hostApi = {};
    Global.hostApi.api = 'https://api.xiaoyee.tech/api/';
    Global.hostApi.ws = 'wss://api.xiaoyee.tech/task/ws/reg';
    Global.hostApi.task = 'https://api.xiaoyee.tech/task/';
  }

  private loadCityConfig(): void {
    if (this.isCityLoaded) return;
    this.isCityLoaded = true;
    this.http
      .get(Global.hostApi.api + 'provinceCityDistrict/findAllJson')
      .toPromise()
      .then(
        response => {
          console.log(response);
          let data: any = response.data;
          for (var i = 0; i < data.length; i++) {
            Global.cityConfig.province[data[i].id] = data[i];
          }
        },
        response => {
          console.log(response);
        }
      )
      .catch(error => {
        console.log(error);
      });
  }

  getHeader(): any {
    if (LocalStorage.getData(this.getStorageType())) {
      return {
        headers: {
          token: LocalStorage.getData(this.getStorageType()).token
        }
      };
    } else {
      return {};
    }
  }

  init(): void {
    if (this.isDev()) {
      this.dev();
    } else {
      this.prod();
    }
    this.loadCityConfig();
    // this.socketHandler.init();
  }

  showLogoutDialog(): void {
    // this.dialog
    // 	.open(LogoutDialogComponent)
    // 	.afterClosed()
    // 	.subscribe(result => {
    // 		if (result) {
    // 			this.logout();
    // 		}
    // 	});
  }

  logout(): void {
    LocalStorage.clearData(this.getStorageType());
    window.location.reload();
  }

  isLogin(): boolean {
    return !!LocalStorage.getData(this.getStorageType());
  }

  isDev(): boolean {
    // return true;
    return window.location.host.indexOf('www.xiaoyee.tech') === -1;
  }

  getUserInfo(): any {
    return LocalStorage.getData(this.getStorageType());
  }

  login(userInfo: any) {
    LocalStorage.setData(this.getStorageType(), userInfo);
  }

  getStorageType(): string {
    return 'xiaoyiyun';
  }

  static postData(data: any, name: string) {
    if (!Global.dataPool) {
      Global.dataPool = {};
    }
    Global.dataPool[name] = data;
  }

  static pullData(name: string) {
    let data = undefined;
    try {
      data = JSON.parse(JSON.stringify(Global.dataPool))[name];
      delete Global.dataPool[name];
    } catch (error) {}
    return data;
  }

  static getData(name: string) {
    let data = undefined;
    try {
      data = JSON.parse(JSON.stringify(Global.dataPool))[name];
    } catch (error) {}
    return data;
  }

  static getCityConfig(): any {
    return Global.cityConfig;
  }

  static getApiHost(): any {
    return Global.hostApi;
  }
}
