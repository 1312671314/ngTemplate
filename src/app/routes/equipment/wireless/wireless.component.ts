import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';

@Component({
  selector: 'app-equipment-wireless',
  templateUrl: './wireless.component.html'
})
export class EquipmentWirelessComponent implements OnInit {
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
  deviceType: string;
  deviceTypeArr: any;
  isVisiblePlace: any;
  place: any;
  editItem: any;
  isVisibleStatus: any;
  statusList: any;
  teadList2: any;
  keyNameList2: any;
  sector: any;
  isPlatForm = true;
  constructor(
    private msg: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: ModalHelper,
    private apiService: ApiService,
    private enumService: EnumService,
    private global: Global
  ) {
    switch (this.global.getUserInfo().category) {
      case 'ORG':
        this.isPlatForm = false;
        break;
      case 'OP':
        this.isPlatForm = false;
        break;
    }
    this.isVisibleStatus = false;
    this.isVisiblePlace = false;
    this.operateId = '-1';
    this.offline = '-1';
    this.deviceType = '-1';
    this.orgName = '';
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;
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

    this.teadList = [
      { name: '设备类型' },
      { name: '联网单位' },
      { name: '安装位置' },
      { name: '设备型号' },
      { name: '设备编号' },
      { name: '通讯状态' },
      { name: '工作状态' },
      { name: '供电方式' },
      // { name: "欠费状态" },
      { name: '实时参数' },
      { name: '关联网关' },
      { name: '操作', widthSet: true }
    ];
    this.keyNameList = [
      { type: 'text', name: 'deviceType' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'workStatusText' },
      { type: 'text', name: 'powerStatusText' },
      { type: 'popUp', name: 'parameter' },
      // { type: 'text', name: 'gatewayNo' },
      { type: 'tooltip', name: 'gatewayNoAbbreviation', allText: 'gatewayNo' },
      {
        type: 'buttonList',
        buttons: [
          { text: '详情', index: 1 },
          { text: '编辑', index: 2 }
        ]
      }
    ];
    this.dataSet = [];

    this.teadList2 = [{ name: '序号' }, { name: '参数名' }, { name: '参数值' }, { name: '上报时间' }];

    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'showValue' },
      { type: 'time', name: 'readTime' }
    ];
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
    this.findAllDeviceType();
    this.getOperationList();
    this.deviceTypeArr = this.enumService.deviceTypeArr;
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
        response.data.content.forEach((element: any) => {
          element.orgName = element.orgName ? element.orgName : '无';
          //型号
          element.deviceType = this.deviceTypeMap[element.typeId] ? this.deviceTypeMap[element.typeId].type : '';
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId] ? this.deviceTypeMap[element.typeId].typeName : '';
          element.offlineText = element.offline ? '离线' : '在线';
          element.powerStatusText = this.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
          element.parameter = '查看数据';
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
          element.gatewayNoAbbreviation = this.enumService.getSerialNumAbbreviation(element.gatewayNo);
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  editFun(event: any) {
    this.editItem = event;
    if (event.btnIndex == 1) {
      this.router.navigate(['detail', event.id], {
        relativeTo: this.activatedRoute
      });
    } else {
      this.place = this.editItem.place;
      this.sector = this.editItem.sector;
      this.isVisiblePlace = true;
    }
  }

  search() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgName: this.orgName,
      operateId: this.operateId,
      offline: this.offline,
      deleted: false,
      // typeId: this.typeId
      deviceType: this.deviceType
    };
    this.getData(data);
  }

  rest() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      deleted: false
    };
    this.orgName = '';
    this.operateId = '-1';
    this.offline = '-1';
    this.getData(data);
  }

  handleCancel() {
    this.isVisible = false;
  }

  popUpFun(item: any) {
    console.log(item);
    this.getDeviceStatus(item);
    this.isVisibleStatus = true;
  }

  getDeviceStatus(item: any) {
    this.apiService.getDeviceStatus(item.id).then(response => {
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

  statusCancel() {
    this.isVisibleStatus = false;
  }

  turnPage(page: number) {
    this.pageIndex = page;
    this.search();
  }

  handleOk2() {
    // data = this.apiService.filterData(data);
    this.apiService.deviceUpdate({ id: this.editItem.id, place: this.place, sector: this.sector }).then(response => {
      if (response && response.data) {
        this.ngOnInit();
        this.isVisiblePlace = false;
        this.msg.success('操作成功');
      } else {
        this.msg.error('编辑失败');
      }
    });
  }

  handleCancel2() {
    this.isVisiblePlace = false;
  }
}
