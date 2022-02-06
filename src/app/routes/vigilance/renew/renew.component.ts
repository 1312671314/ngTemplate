import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

@Component({
  selector: 'app-vigilance-renew',
  templateUrl: './renew.component.html'
})
export class VigilanceRenewComponent implements OnInit {
  public teadList: any;
  public dataSet: any;
  public total = 0;
  public keyNameList: any;
  public isVisible: boolean;
  public pageSize: number;
  public pageIndex: number;
  public workStatusMap: any;
  public connectStatusMap: any;
  public powerStatusMap: any;
  public operationList: any;
  public operateId: any;
  public offline: any;
  public orgName: String;
  operationMap: any;
  deviceTypeMap: any;
  deviceTypeList: any;
  deviceType: any;
  checkList: any;
  isBatch: boolean;
  ids: any;
  editItem: any;
  deviceTypeArr: any;
  statusList: any;
  isVisibleStatus: any;
  teadList2: any;
  total2: any;
  keyNameList2: any;
  isolateRemindEndDay: any;
  constructor(
    private msg: NzMessageService,
    private router: Router,
    private modal: ModalHelper,
    private apiService: ApiService,
    private enumService: EnumService
  ) {
    this.offline = '-1';
    this.operateId = '-1';
    this.isolateRemindEndDay = '-1';
    this.isVisibleStatus = false;
    this.isBatch = false;
    this.operateId = '-1';
    this.offline = '-1';
    this.deviceType = '-1';
    this.orgName = '';
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;
    this.ids = [];
    this.deviceTypeMap = {};
    this.workStatusMap = {
      NORMAL: '正常',
      ALERT: '警情',
      ERROR: '故障',
      DEBUG: '调试',
      DISABLED: '屏蔽'
    };

    this.connectStatusMap = {
      ONLINE: '在线',
      OFFLINE: '离线',
      UNKNOWN: '未知'
    };

    this.powerStatusMap = {
      WIRED: '市电',
      BACKUP: '备电',
      BATTERY: '电池'
    };

    this.teadList2 = [{ name: '序号' }, { name: '参数名' }, { name: '参数值' }, { name: '上报时间' }];

    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'value' },
      { type: 'time', name: 'readTime' }
    ];

    this.teadList = [
      { name: '序号', type: 'index' },
      { name: '设备编号' },
      { name: '设备类型' },
      { name: '联网单位' },
      { name: '安装位置' },
      { name: '解除隔离提醒' },
      { name: '隔离原因' },
      { name: '处理人' },
      //   { name: '是否故障' },
      { name: '处理结果' },
      { name: '操作' }
    ];
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'deviceType' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'isolateRemindEndTimeDays' },
      { type: 'text', name: 'isolateEventName' },
      { type: 'text', name: 'isolateUserName' },
      //   { type: 'text', name: 'faultText' },
      { type: 'tooltip', name: 'isolateRemark', allText: 'isolateRemark' },
      //   { type: 'text', name: 'powerStatusText' },
      //   { type: 'popUp', name: 'parameter' },
      //   { type: 'text', name: 'gatewayNo' },
      { type: 'buttonList', buttons: [{ text: '解除隔离', index: 1 }] }
    ];
    this.dataSet = [];
  }

  ngOnInit(): void {
    this.getOperationList();
    this.deviceTypeArr = this.enumService.deviceTypeArr;
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
        this.findAllDeviceType();
      }
    });
  }

  // 设备类型
  findAllDeviceType() {
    this.apiService.findAllDeviceType().then(response => {
      if (response && response.data) {
        this.deviceTypeList = response.data;
        this.deviceTypeMap = this.enumService.getMap(this.deviceTypeList);
        this.search();
      }
    });
  }

  getData(data: object) {
    data = this.apiService.filterData(data);
    this.apiService.getDevice(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          element.index = index;
          element.serialNumAll = element.serialNum;
          element.orgName = element.orgName ? element.orgName : '无';
          //型号
          element.deviceType = this.deviceTypeMap[element.typeId].type;
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId].typeName;
          element.offlineText = element.offline ? '离线' : '在线';
          element.isolated = element.isolated ? '隔离' : '未隔离';
          element.faultText = element.fault ? '是' : '否';
          element.powerStatusText = this.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
          element.parameter = '查看数据';
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
          if (element.isolateRemindEndTime) {
            let now = new Date().getTime();
            if (element.isolateRemindEndTime - now > 0) {
              let time = element.isolateRemindEndTime - now;
              element.isolateRemindEndTimeDays = Math.ceil(time / 86400000) + '天';
            } else {
              element.isolateRemindEndTimeDays = '已过期';
            }
          } else {
            element.isolateRemindEndTimeDays = '未设置';
          }
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  batchOperation(index: any) {
    // this.checkResult = index
    this.isBatch = true; //批量
    this.ids = [];
    let isHasCheck = false;
    if (this.checkList && this.checkList.length != 0) {
      this.checkList.forEach((item: any) => {
        if (item.checked) {
          isHasCheck = true;
        }
      });
    }

    if (isHasCheck) {
      this.isVisible = true;
    } else {
      this.msg.warning('至少选择一条警情进行批量操作!');
    }
  }

  editFun(event: any) {
    // this.router.navigate(['/equipment/wireless-detail'], {
    // 	queryParams: {deviceId:event.id}
    // })
    this.editItem = event;
    if (event.btnIndex == 1) {
      this.isVisible = true;
    }
  }

  popUpFun(item: any) {
    console.log(item);
    this.getDeviceStatus(item);
    this.isVisibleStatus = true;
  }

  getDeviceStatus(item: any) {
    this.apiService.getDeviceStatus(item.id).then(response => {
      console.log(item);
      if (response && response.data) {
        response.data.forEach((item: any, index: any) => {
          item.index = index;
          if (item.converter && item.converter.indexOf('/') != -1) {
            item.value = item.value / item.converter.split('/')[1] + item.unitName;
          } else if (item.converter && item.converter.indexOf('*') != -1) {
            item.value = item.value * item.converter.split('*')[1] + item.unitName;
          }
        });
        this.statusList = response.data;
      } else {
        this.statusList = [];
      }
    });
  }

  statusCancel() {
    this.isVisibleStatus = false;
  }

  checkBoxFun(list: any) {
    console.log(list);
    this.checkList = list;
  }

  search() {
    let isolateRemindEndTime;
    if (this.isolateRemindEndDay == 3) {
      isolateRemindEndTime = new Date().getTime() + 86400000 * 3;
    } else if (this.isolateRemindEndDay == 0) {
      isolateRemindEndTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
    }
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgName: this.orgName,
      operateId: this.operateId,
      offline: this.offline,
      deviceType: this.deviceType,
      isolated: true,
      isolateRemindEndTime: isolateRemindEndTime
    };
    this.getData(data);
  }

  rest() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      isolated: true
    };
    this.isolateRemindEndDay = '-1';
    this.orgName = '';
    this.operateId = '-1';
    this.offline = '-1';
    this.getData(data);
  }

  handleCancel() {
    this.isVisible = false;
    this.isBatch = false;
  }

  turnPage(page: number) {
    this.pageIndex = page;
    this.search();
  }

  turnPage2(event: object) {}

  handleOk() {
    this.ids = [];
    if (this.checkList.length != 0 && this.isBatch) {
      this.checkList.forEach((item: any) => {
        if (item.checked) {
          this.ids.push(item.id);
        }
      });
    } else if (!this.isBatch) {
      this.ids.push(this.editItem.id);
    }
    let data = { ids: this.ids };
    console.log(data);
    this.apiService.batchIsolateCancel(data).then(response => {
      this.isVisible = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.search();
      } else {
        this.msg.error(response.message);
      }
    });
  }
}
