import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Global } from './global.service';

@Injectable()
export class EnumService {
  public noticeList = [
    {
      levelName: '高',
      operateInfoId: 0,
      type: 0,
      list: [
        {
          messageType: 'FIRE_ALARM',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'FIRE_WARN',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'DEVICE_FAULT',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'EVENT',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        }
      ]
    },
    {
      levelName: '中',
      type: 0,
      list: [
        {
          messageType: 'FIRE_ALARM',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'FIRE_WARN',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'DEVICE_FAULT',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'EVENT',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        }
      ]
    },
    {
      levelName: '低',
      type: 0,
      list: [
        {
          messageType: 'FIRE_WARN',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'FIRE_ALARM',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'DEVICE_FAULT',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        },
        {
          messageType: 'EVENT',
          hasSMS: false,
          hasPhone: false,
          hasWeixin: false,
          hasWebPush: false
        }
      ]
    }
  ];

  public processTypeMap = {
    REPORT: '上报',
    CHECK_ERROR: '确认误报',
    CHECK_VERIFIED: '确认成灾',
    RESET: '远程复位',
    INSULATE: '远程隔离',
    NOTIFY_SMS: '短信通知',
    NOTIFY_PHONE: '电话通知',
    NOTIFY_WEIXIN: '微信通知',
    ALL_CLEAR: '解除'
  };
  public userTypeMap = {
    USER: '用户',
    SYSTEM: '系统',
    FIRE_WARN: '预警',
    FIRE_ALARM: '告警',
    DEVICE_FAULT: '故障',
    DEVICE: '设备'
  };

  public messageStatausMap = {
    REPORT: '上报',
    CHECK_ERROR: '确认误报',
    CHECK_VERIFIED: '确认成灾',
    RESET: '远程复位',
    INSULATE: '远程隔离',
    NOTIFY_SMS: '短信通知',
    NOTIFY_PHONE: '电话通知',
    NOTIFY_WEIXIN: '微信通知',
    ALL_CLEAR: '解除'
  };

  public materialMap: any;
  public materialArr = [];

  public deviceTypeArr = [
    {
      val: 1,
      name: '烟感'
    },
    {
      val: 2,
      name: '手报'
    },
    {
      val: 3,
      name: '声光报警器'
    },
    {
      val: 4,
      name: '预警灯'
    },
    {
      val: 5,
      name: '燃气传感器'
    },
    {
      val: 6,
      name: '电气感线路'
    },
    {
      val: 7,
      name: '电气感主机'
    },
    {
      val: 8,
      name: '燃气感主机'
    },
    {
      val: 9,
      name: '用户传输装置'
    },
    {
      val: 10,
      name: '智能预警'
    }
  ];

  public deviceMap = {
    1: '烟感',
    2: '手报',
    3: '声光报警器',
    4: '预警灯',
    5: '燃气传感器',
    6: '电气感线路',
    7: '电气感主机',
    8: '燃气感主机',
    9: '用户传输装置',
    10: '智能预警'
  };

  public businessArr = [
    {
      val: 1,
      name: '正常'
    },
    {
      val: 2,
      name: '停业'
    },
    {
      val: 3,
      name: '装修'
    }
  ];

  public businessMap = {
    1: '正常',
    2: '停业',
    3: '装修'
  };

  public rescuerArr = [
    {
      val: 0,
      name: '未知'
    },
    {
      val: 1,
      name: '正常'
    },
    {
      val: 2,
      name: '停业'
    }
  ];

  public rescuerMap = {
    0: '未知',
    1: '正常',
    2: '停业'
  };

  public messageTypeArr = [
    {
      val: '1',
      name: '预警'
    },
    {
      val: '0',
      name: '告警'
    }
  ];

  public powerStatusMap: any;
  // public operationList = [];
  // deviceTypeList: any;
  public locationConfig: any;

  constructor(private apiService: ApiService, public global: Global) {
    this.materialMap = {};
    // this.buildAttributeMap = {};
    this.powerStatusMap = {
      // NORMAL: '正常',
      // ALERT: '警情',
      // ERROR: '故障',
      // DEBUG: '调试',
      // DISABLED: '屏蔽'
      WIRED: '市电',
      BACKUP: '备电',
      BATTERY: '电池'
    };
  }
  // 设备状态
  deviceStatus(deveice: any) {
    let workStatusText = '';
    if (!deveice.alarm && !deveice.warn && !deveice.fault) {
      workStatusText = '正常';
    }
    if (deveice.alarm) {
      workStatusText += '告警 ';
    }
    if (deveice.warn) {
      workStatusText += ' 预警';
    }
    if (deveice.fault) {
      workStatusText += ' 故障';
    }
    return workStatusText;
  }

  getProvince(provinceId: number): any {
    this.locationConfig = this.locationConfig ? this.locationConfig : Global.getCityConfig();
    if (provinceId == -1) return { id: '', name: '' };
    return this.locationConfig.province[provinceId];
  }

  getCity(provinceId: number, cityId: number): any {
    this.locationConfig = this.locationConfig ? this.locationConfig : Global.getCityConfig();
    if (provinceId == -1 || cityId == -1) return { id: '', name: '' };
    return this.locationConfig.province[provinceId].cites[cityId];
  }

  getDistrict(provinceId: number, cityId: number, districtId: number): any {
    this.locationConfig = this.locationConfig ? this.locationConfig : Global.getCityConfig();
    if (provinceId == -1 || cityId == -1 || districtId == -1) return { id: '', name: '' };
    return this.locationConfig.province[provinceId].cites[cityId].districts[districtId];
  }

  getSSQ(provinceId: any, cityId: any, districtId: any) {
    if (provinceId && cityId && districtId) {
      let SSQ = '';
      if (this.getProvince(provinceId).name == this.getCity(provinceId, cityId).name) {
        SSQ = this.getCity(provinceId, cityId).name + this.getDistrict(provinceId, cityId, districtId).name;
      } else {
        SSQ =
          this.getProvince(provinceId).name + this.getCity(provinceId, cityId).name + this.getDistrict(provinceId, cityId, districtId).name;
      }
      return SSQ;
    } else {
      return '-';
    }
  }

  getSerialNumAbbreviation(str: string) {
    if (str && str.length > 11) {
      let strHead = str.substring(0, 4);
      let strTail = str.substring(str.length - 4, str.length);
      return strHead + '***' + strTail;
    } else {
      return str;
    }
  }

  getMap(list: any) {
    let map: any = {};
    if (list && list.length > 0) {
      list.forEach((item: any) => {
        map[item.id] = item;
      });
      return map;
    } else {
      return map;
    }
  }

  isMobile(value: any) {
    // return typeof value === 'string' && /(^1\d{10}$)/.test(value);
    let str = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    return str.test(value);
  }

  isPlatForm() {
    let isPlatForm = true;
    switch (this.global.getUserInfo().category) {
      case 'ORG':
        isPlatForm = false;
        break;
      case 'OP':
        isPlatForm = false;
        break;
    }
    return isPlatForm;
  }
}
