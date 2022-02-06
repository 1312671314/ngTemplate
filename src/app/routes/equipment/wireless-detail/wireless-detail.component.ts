import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

@Component({
  selector: 'app-equipment-wireless-detail',
  templateUrl: './wireless-detail.component.html'
})
export class EquipmentWirelessDetailComponent implements OnInit {
  deviceId: any;
  deviceType: any;
  deviceInfo: any;
  orgInfo: any;
  deviceTypeMap: any;
  historyTypeList: any;
  type: any;
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  historyData: any;
  teadList2: any;
  keyNameList2: any;
  statusList: any;
  total2 = 0;
  pointList: any;
  pointTeadList: any;
  pointKeyNameList: any;
  isShowPointList: any;
  isVisibleRelative: boolean;
  deviceList: any;
  deviceTotal: any;
  deviceTeadList: any;
  deviceKeyNameList: any;
  isVisibleStop = false;
  isolateRemindEndTime: any;
  checkOptionsRowThree: any;
  checkOptionsRowOne: any;
  checkOptionsRowTwo: any;
  ids: any;
  checkRemark: any;
  checkList: any;
  checkResult: any;
  isVisibleStart = false;
  constructor(
    private enumService: EnumService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: _HttpClient,
    private modal: ModalHelper,
    private msg: NzMessageService,
    private cdf: ChangeDetectorRef
  ) {
    this.ids = [];
    this.checkOptionsRowThree = [
      { label: '设备调试', value: '设备调试' },
      { label: '故障扰民', value: '故障扰民' },
      { label: '用户装修', value: '用户装修' }
    ];

    this.checkOptionsRowOne = [
      { label: '设备调试', value: '设备调试' },
      { label: '故障扰民', value: '故障扰民' },
      { label: '用户装修', value: '用户装修' },
      { label: 'SIM卡欠费', value: 'SIM卡欠费' }
    ];

    this.checkOptionsRowTwo = [
      { label: '灯光误报', value: '灯光误报' },
      { label: '现场测试', value: '现场测试' },
      { label: '手报误触', value: '手报误触' }
    ];
    this.isVisibleRelative = false;

    this.deviceTeadList = [
      { name: '设备类型' },
      // { name: '联网单位' },
      { name: '安装位置' },
      { name: '设备型号' },
      { name: '设备编号' },
      { name: '通讯状态' },
      { name: '工作状态' },
      { name: '供电方式' },
      // { name: "欠费状态" },
      // { name: '实时参数' },
      { name: '关联网关' }
      // { name: '操作', widthSet: false }
    ];
    this.deviceKeyNameList = [
      { type: 'text', name: 'deviceType' },
      // { type: 'text', name: 'orgName' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'workStatusText' },
      { type: 'text', name: 'powerStatusText' },
      // { type: 'popUp', name: 'parameter' },
      { type: 'tooltip', name: 'gatewayNoAbbreviation', allText: 'gatewayNo' }
      // {
      //   type: 'buttonList',
      //   buttons: [{ text: '详情', index: 1 }]
      // }
    ];

    this.pointTeadList = [
      { name: '序号', type: 'index' },
      { name: '点位名称' },
      { name: '安装位置' },
      { name: '设备型号' },
      { name: '设备编号' },
      { name: '通信状态' },
      { name: '工作状态' },
      { name: '供电方式' }
    ];

    this.pointKeyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'deviceType' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'text', name: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'workStatusText' },
      { type: 'text', name: 'powerStatusText' }
    ];
    this.statusList = [];
    this.teadList2 = [{ name: '序号', type: 'index' }, { name: '参数名' }, { name: '参数值' }, { name: '上报时间' }];
    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'showValue' },
      { type: 'time', name: 'readTime' }
    ];
    this.deviceType = 1;
    this.type = '1';
    this.isVisible = false;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.deviceInfo = {};
    this.orgInfo = {};
    this.historyTypeList = [
      {
        val: 1,
        name: '预警'
      },
      {
        val: 2,
        name: '告警'
      },
      {
        val: 3,
        name: '事件'
      },
      {
        val: 4,
        name: '故障'
      }
    ];
    this.type = 1;

    this.teadList = [
      { name: '序号', type: 'index' },
      { name: '事情名称' },
      { name: '首次上报时间' },
      { name: '最后上报时间' },
      { name: '处理人' },
      { name: '处理备注' }
    ];
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'time', name: 'firstReportTime' },
      { type: 'time', name: 'lastReportTime' },
      { type: 'text', name: 'checkUserName' },
      { type: 'text', name: 'checkRemark' }
    ];
  }

  // 设备类型
  findAllDeviceType() {
    this.apiService.findAllDeviceType().then(response => {
      if (response && response.data) {
        // this.deviceTypeList = response.data;
        this.deviceTypeMap = this.enumService.getMap(response.data);
        this.getData();
      }
    });
  }

  ngOnInit(): void {
    this.findAllDeviceType();
    this.deviceId = this.activatedRoute.snapshot.params['deviceId'];
    // this.searchDeviceFault()
    // this.searchDeviceEvent()
    // this.searchFireWarn()
  }

  getDeviceStatus(item: any) {
    this.apiService.getDeviceStatus(item.id).then(response => {
      console.log(item);
      if (response && response.data) {
        response.data.forEach((item: any, index: any) => {
          item.index = index;
          if (item.converter) {
            item.showValue = eval(item.value + item.converter) + (item.unitName ? item.unitName : '');
          } else {
            item.showValue = item.value + (item.unitName ? item.unitName : '');
          }
        });
        this.statusList = response.data;
      } else {
        this.statusList = [];
      }
    });
  }

  getData() {
    this.apiService.deviceFindById(this.deviceId).then(response => {
      if (response && response.data) {
        this.getDeviceStatus(response.data);
        response.data.typeImg = this.deviceTypeMap[response.data.typeId].typeImg;
        response.data.wanConnType = this.deviceTypeMap[response.data.typeId].wanConnType; //通讯方式
        response.data.factory = this.deviceTypeMap[response.data.typeId].factory; //厂家
        response.data.deviceType = this.deviceTypeMap[response.data.typeId].type; //型号
        response.data.deviceTypeName = this.deviceTypeMap[response.data.typeId].typeName; //类型
        response.data.offlineText = response.data.offline ? '离线' : '在线';
        response.data.detachedText = response.data.detached ? '是' : '否'; //拆除
        response.data.workStatusText = this.enumService.deviceStatus(response.data);
        response.data.powerStatusText = this.enumService.powerStatusMap[response.data.powerStatus];
        // this.powerStatusMap[element.powerStatus]
        this.deviceInfo = response.data;
        this.historyData = {
          closed: true,
          page: 0,
          size: 10
        };

        if (response.data.deviceType.indexOf('烟感') != -1) {
          this.deviceType = 1;
        }

        if (response.data.deviceType.indexOf('声光') != -1) {
          this.deviceType = 3;
        }

        if (response.data.deviceType.indexOf('电器') != -1) {
          this.deviceType = 5;
        }

        if (response.data.deviceType.indexOf('燃气') != -1) {
          this.deviceType = 6;
        }

        if (this.deviceInfo.category === '网关') {
          this.historyData['gatewayId'] = this.deviceInfo.id;
          this.findByGatewayId(this.deviceInfo.id);
        } else {
          this.historyData['sensorId'] = this.deviceInfo.id;
        }

        if (this.type == '1') {
          // 预警
          this.searchFireWarn();
        } else if (this.type == '2') {
          // 告警
          this.searchFireAlarm();
        } else if (this.type == '3') {
          // 事件
          this.searchDeviceEvent();
        } else {
          // 故障
          this.searchDeviceFault();
        }
        this.getOrgInfo();
      }
    });
  }

  findByGatewayId(id: any) {
    this.isShowPointList = true;
    this.apiService.findByGatewayId(id).then(response => {
      if (response && response.data) {
        let arr: any[] = [];
        response.data.forEach((element: any, index: any) => {
          console.log(element);
          // if (id != element.id) {
          //型号
          element.index = index;
          element.deviceType = this.deviceTypeMap[element.typeId].type;
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId].typeName;
          element.offlineText = element.offline ? '离线' : '在线';
          element.isolated = element.isolated ? '隔离' : '未隔离';
          element.powerStatusText = this.enumService.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
          arr.push(element);
          // }
        });
        this.pointList = arr;
      } else {
        this.pointList = [];
      }
    });
  }

  historyTypeOnChange(type: any) {
    this.historyData.page = this.pageIndex - 1;
    this.historyData.size = 10;
    this.type = type;
    if (this.type == '1') {
      // 预警
      this.searchFireWarn();
    } else if (this.type == '2') {
      // 告警
      this.searchFireAlarm();
    } else if (this.type == '3') {
      // 事件
      this.searchDeviceEvent();
    } else {
      // 故障
      this.searchDeviceFault();
    }
  }

  getOrgInfo() {
    this.apiService.findOrgById(this.deviceInfo.orgId).then(response => {
      if (response && response.data) {
        this.orgInfo = response.data;
      }
    });
  }

  setDevice(index = 0) {
    console.log(index);
    if (index == 0) {
      this.isVisibleStop = true;
    }
    if (index == 3) {
      this.isVisible = true;
      // 隔离
    }
    if (index == 1) {
      // 启动
      this.isVisibleStart = true;
    }
  }

  turnPage(page: number) {
    this.historyData.page = page - 1;
    this.historyData.size = 10;
    if (this.type == '1') {
      // 预警
      this.searchFireWarn();
    } else if (this.type == '2') {
      // 告警
      this.searchFireAlarm();
    } else if (this.type == '3') {
      // 事件
      this.searchDeviceEvent();
    } else {
      // 故障
      this.searchDeviceFault();
    }
  }

  back() {
    this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
  }

  searchFireAlarm() {
    this.apiService.searchFireAlarm(this.historyData).then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          // element.name = '火警告警';
          element.index = index;
          if (!element.checkUserName) {
            if (element.subjectType == 'SYSTEM') {
              element.checkUserName = '系统';
              element.checkRemark = element.content;
            }
          }
        });
        this.total = response.data.totalElements;
        this.dataSet = response.data.content;
      }
    });
  }

  searchDeviceFault() {
    this.apiService.searchDeviceFault(this.historyData).then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          // element.name = '故障';
          element.index = index;
          if (!element.checkUserName) {
            if (element.subjectType == 'SYSTEM') {
              element.checkUserName = '系统';
              element.checkRemark = element.content;
            }
          }
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements;
      }
    });
  }

  searchDeviceEvent() {
    this.apiService.searchDeviceEvent(this.historyData).then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          // element.name = '事件';
          element.index = index;
          if (!element.checkUserName) {
            if (element.subjectType == 'SYSTEM') {
              element.checkUserName = '系统';
              element.checkRemark = element.content;
            }
          }
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements;
      }
    });
  }

  searchFireWarn() {
    this.apiService.searchFireWarn(this.historyData).then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          // element.name = '预警';
          element.index = index;
          if (!element.checkUserName) {
            if (element.subjectType == 'SYSTEM') {
              element.checkUserName = '系统';
              element.checkRemark = element.content;
            }
          }
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements;
      }
    });
  }
  // 查看联动设备
  showRelative() {
    this.apiService.findRelative(this.deviceInfo.id).then(response => {
      console.log(response);
      if (response && response.data && response.data.length != 0) {
        this.isVisibleRelative = true;
        response.data.forEach((element: any, index: number) => {
          element.orgName = element.orgName ? element.orgName : '无';
          //型号
          element.deviceType = this.deviceTypeMap[element.typeId].type;
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId].typeName;
          element.offlineText = element.offline ? '离线' : '在线';
          element.powerStatusText = this.enumService.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
          element.parameter = '查看数据';
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
          element.gatewayNoAbbreviation = this.enumService.getSerialNumAbbreviation(element.gatewayNo);
        });
        this.deviceList = response.data;
        this.deviceTotal = response.totalElements;
      } else {
        this.msg.info('未查询到联动设备');
        this.deviceList = [];
        this.deviceTotal = 0;
      }
    });
  }

  isVisibleOut(item: any) {
    this.isVisibleRelative = false;
  }

  viewDevice(item: any) {
    this.isVisibleRelative = false;
    this.router.navigate(['../../detail', item.id], {
      relativeTo: this.activatedRoute
    });
    // history.pushState(item.id, 'title', '../../detail/' + item.id);
    this.deviceId = item.id;
    this.getData();
    // this.cdf.markForCheck();
    // this.cdf.detectChanges();
  }

  Cancel() {
    this.isVisibleStop = false;
  }

  OkStop() {
    this.apiService.stopLightAndVoice(this.deviceInfo.id).then(response => {
      this.isVisibleStop = false;
      if (response && response.success) {
        this.msg.success('操作成功');
      } else {
        if (response.message) {
          this.msg.success(response.message);
        } else {
          this.msg.error('操作失败');
        }
      }
    });
  }

  startCancel() {
    this.isVisibleStart = false;
  }

  OkStart() {
    this.apiService.startLightAndVoice(this.deviceInfo.id).then(response => {
      this.isVisibleStart = false;
      if (response && response.success) {
        this.msg.success('操作成功');
      } else {
        if (response.message) {
          this.msg.success(response.message);
        } else {
          this.msg.error('操作失败');
        }
      }
    });
  }

  dateOnChange(date: any) {
    console.log(date);
    this.isolateRemindEndTime = new Date(date).getTime();
  }

  handleCancel2() {
    this.isVisible = false;
    this.checkOptionsRowOne.forEach((item: any) => {
      item.checked = false;
    });
  }

  handleOk2() {
    this.ids = [];
    let checkRemark = this.checkRemark;
    this.checkOptionsRowOne.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });

    checkRemark = checkRemark.substring(checkRemark.length - 1) == ',' ? checkRemark.substring(0, checkRemark.length - 1) : checkRemark;
    this.ids.push(this.deviceInfo.id);

    let data = {
      ids: this.ids,
      checkResult: this.checkResult,
      checkRemark: checkRemark,
      bacthType: 2,
      isolateRemindEndTime: this.isolateRemindEndTime
    };
    console.log(data);
    this.apiService.batchIsolate(data).then(response => {
      this.isVisible = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.checkRemark = '';
        this.getData();
      } else {
        this.msg.error(response.message);
      }
    });
  }

  checkOptionsChangesThree(list: any) {}
}
