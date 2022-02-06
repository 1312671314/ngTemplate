import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

@Component({
  selector: 'app-vigilance-history',
  templateUrl: './history.component.html'
})
export class VigilanceHistoryComponent implements OnInit {
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  checkResultMap: any;
  editItem: any;
  checkOptions: any;
  checkRemark = '';
  orgName: any;
  operateId: any;
  offline: any;
  typeId: any;
  operationList: any;
  operationMap: any;
  deviceTypeList: any;
  deviceTypeMap: any;
  messageTypeArr: any;
  messageTypeId: any;
  date: any;
  reportTimeStart: any;
  reportTimeEnd: any;
  checkResult: any;
  checkOptionsRowOne: { label: string; value: string }[];
  checkOptionsRowTwo: { label: string; value: string }[];
  isVisibleDetail = false;
  messageType = 1;
  historyTypeList: any;
  type: any;
  orgInfo: any;
  orgTypeArr: any;
  industryArr: any;
  businessArr: any;
  levelList: any;
  levelMap: any;
  riskSourceMap: any;
  charactarList: any;
  charactarMap: any;
  orgTypeMap: any;
  industryMap: any;
  industryCategoryMap: any;
  getProvince: any;
  getCity: any;
  getDistrict: any;
  historyData: any;
  ids: any;
  isBatch: boolean;
  checkList: any;
  isVisibleIsolation: boolean;
  messageTypeList: any;
  messageStatusMap: any;
  teadList2: any;
  keyNameList2: any;
  dataSet2: any;
  total2: any;
  pageIndex2 = 1;
  pageSize2 = 10;
  accusativeType: any;
  userTypeMap: any;
  deviceTypeArr: any;
  deviceType = '-1';
  riskSourceAll: any;
  constructor(
    private msg: NzMessageService,
    private router: Router,
    private modal: ModalHelper,
    private apiService: ApiService,
    private enumService: EnumService
  ) {
    this.operationMap = {};
    this.isVisibleIsolation = false;
    this.isBatch = false;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;
    this.messageTypeId = 2;
    this.ids = [];
    this.date = [];
    this.total2 = 0;
    this.orgInfo = {
      ownershipType: ''
    };

    this.messageTypeList = [
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

    this.checkResultMap = {
      0: '已通知',
      1: '火警',
      2: '误报'
    };
    this.teadList = [
      { name: '序号', type: 'index' },
      { name: '联网单位' },
      { name: '设备类型' },
      { name: '安装位置' },
      // { name: '首次上报' },
      { name: '上报时间' },
      { name: '消息类型' },
      { name: '处理状态' },
      { name: '最新处理人' },
      { name: '故障次数' },
      { name: '处理结果' },
      { name: '操作', oneBtn: true }
    ];
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'type' },
      { type: 'text', name: 'place' },
      // { type: 'time', name: 'firstReportTime' },
      { type: 'time', name: 'lastReportTime' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'checkResultText' },
      { type: 'text', name: 'checkUserName' },
      { type: 'text', name: 'count' },
      { type: 'tooltip', name: 'checkRemark', allText: 'checkRemark' },
      { type: 'buttonList', buttons: [{ text: '详情', index: 3 }] }
    ];

    this.dataSet = [];

    this.checkOptionsRowOne = [
      { label: '抽烟误报', value: '抽烟误报' },
      { label: '灰尘误报', value: '灰尘误报' },
      { label: '油烟误报', value: '油烟误报' },
      { label: '水蒸气误报', value: '水蒸气误报' }
    ];

    this.checkOptionsRowTwo = [
      { label: '灯光误报', value: '灯光误报' },
      { label: '现场测试', value: '现场测试' },
      { label: '手报误触', value: '手报误触' }
    ];

    this.orgName = '';
    this.operateId = '-1';
    this.offline = '-1';
    this.orgTypeMap = {};
    this.industryMap = {};
    this.messageStatusMap = {};

    this.teadList2 = [
      { name: '序号', type: 'index' },
      { name: '处理时间' },
      { name: '类型' },
      { name: '处理人' },
      { name: '处理方式' },
      { name: '处理备注' }
    ];
    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'time', name: 'createTime' },
      { type: 'text', name: 'userTypeText' },
      { type: 'text', name: 'subjectName' },
      { type: 'text', name: 'processTypeText' },
      { type: 'tooltip', name: 'content' }
    ];
    this.dataSet2 = [];
    this.userTypeMap = {};
  }

  // 物业类型
  orgAttributeFindAll() {
    this.apiService.orgAttributeFindAll().then(response => {
      if (response && response.data) {
        // this.industryCategoryArr = response.data;
        this.industryCategoryMap = this.enumService.getMap(response.data);
      }
    });
  }

  // 角色查询
  charactarSearch() {
    this.apiService.charactarSearch().then(response => {
      if (response && response.data) {
        this.charactarList = response.data;
        this.charactarMap = this.enumService.getMap(response.data);
      }
    });
  }

  getRiskSourceAll() {
    this.apiService.getRiskSourceAll().then(response => {
      if (response && response.data) {
        this.riskSourceAll = response.data;
        this.riskSourceMap = this.enumService.getMap(response.data);
      }
    });
  }

  ngOnInit(): void {
    this.findAllDeviceType();
    this.orgAttributeFindAll();
    this.industryTypeFindAll();
    this.getOperationList();
    this.charactarSearch();
    this.getRiskSourceAll();
    this.searchLevel();
    this.deviceTypeArr = this.enumService.deviceTypeArr;
    this.messageStatusMap = this.enumService.messageStatausMap;
    this.messageTypeArr = this.enumService.messageTypeArr;
    this.userTypeMap = this.enumService.userTypeMap;
    this.getProvince = this.enumService.getProvince;
    this.getCity = this.enumService.getCity;
    this.getDistrict = this.enumService.getDistrict;

    this.search();
  }

  searchLevel() {
    this.apiService.searchLevel().then(response => {
      if (response && response.data) {
        let arr: { levelId: any; remark: string }[] = [];
        response.data.forEach((deveice: any) => {
          let text = '';
          deveice.list.forEach((item: any) => {
            text += item.remark;
          });
          arr.push({
            levelId: deveice.level,
            remark: text
          });
        });
        this.levelList = arr;
        this.levelMap = this.enumService.getMap(response.data);
      }
    });
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
      }
    });
  }

  // 行业归属
  industryTypeFindAll() {
    this.apiService.industryTypeFindAll().then(response => {
      if (response && response.data) {
        this.industryArr = response.data;
        this.industryMap = this.enumService.getMap(response.data);
      }
    });
  }

  orgTypeFindAll() {
    this.apiService.orgTypeFindAll().then(response => {
      if (response && response.data) {
        this.orgTypeArr = response.data;
        this.orgTypeMap = this.enumService.getMap(this.orgTypeArr);
      }
    });
  }

  // 设备类型
  findAllDeviceType() {
    this.apiService.findAllDeviceType().then(response => {
      if (response && response.data) {
        this.deviceTypeList = response.data;
        this.deviceTypeMap = this.enumService.getMap(this.deviceTypeList);
      }
    });
  }

  typeOnChange(type: any) {
    this.type = type;
  }

  historyTypeOnChange(type: any) {
    this.processLogSearch();
  }

  checkOptionsChangesOne(event: any) {
    console.log(event);
  }

  checkOptionsChangesTwo(event: any) {
    console.log(event);
  }

  searchFireAlarm(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.searchFireAlarm(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: any) => {
          element.index = index;
          element.messageType = '告警';
          element.checkResultText = this.checkResultMap[element.checkResult];
          if (element.subjectType == 'SYSTEM') {
            element.subjectName = '系统';
            element.checkUserName = '系统';
            element.checkRemark = element.content;
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

  searchDeviceEvent(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.searchDeviceEvent(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: any) => {
          element.index = index;
          element.messageType = '事件';
          if (element.subjectType == 'SYSTEM') {
            element.subjectName = '系统';
            element.checkUserName = '系统';
            element.checkRemark = element.content;
          }
          element.checkResultText = this.checkResultMap[element.checkResult];
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  onChange(result: Date[]): void {
    this.reportTimeStart = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.reportTimeEnd = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  searchFireWarn(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.searchFireWarn(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: any) => {
          element.index = index;
          element.messageType = '预警';
          if (element.subjectType == 'SYSTEM') {
            element.subjectName = '系统';
            element.checkUserName = '系统';
            element.checkRemark = element.content;
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

  editFun(event: any) {
    this.editItem = event;

    if (event.btnIndex == 1) {
      this.ids = [];
      this.isBatch = false;
      this.isVisible = true;
    } else if (event.btnIndex == 2) {
      this.isBatch = false;
      this.isVisibleIsolation = true;
    } else {
      this.isVisibleDetail = true;
      this.getOrgInfo();
    }
  }

  batchOperation(index: any) {
    this.checkResult = index;
    this.isBatch = true;
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

  handleOkBatchIsolate() {
    let checkRemark = this.checkRemark;
    this.checkOptionsRowOne.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });

    this.checkOptionsRowTwo.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });

    checkRemark = checkRemark.substring(checkRemark.length - 1) == ',' ? checkRemark.substring(0, checkRemark.length - 1) : checkRemark;

    if (this.checkList.length != 0 && this.isBatch) {
      this.checkList.forEach((item: any) => {
        if (item.checked) {
          this.ids.push(item.id);
        }
      });
    } else if (!this.isBatch) {
      this.ids.push(this.editItem.id);
    }
    let data = { ids: this.ids, checkResult: this.checkResult, checkRemark: checkRemark, bacthType: this.messageTypeId };
    console.log(data);
    this.apiService.batchIsolate(data).then(response => {
      this.isVisibleIsolation = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.checkRemark = '';
        this.search();
      } else {
        this.msg.error(response.message);
      }
    });
  }

  handleOk() {
    this.ids = [];
    let checkRemark = this.checkRemark;
    this.checkOptionsRowOne.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });

    this.checkOptionsRowTwo.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });

    checkRemark = checkRemark.substring(checkRemark.length - 1) == ',' ? checkRemark.substring(0, checkRemark.length - 1) : checkRemark;

    // this.editItem.id
    if (this.checkList.length != 0 && this.isBatch) {
      this.checkList.forEach((item: any) => {
        if (item.checked) {
          this.ids.push(item.id);
        }
      });
    } else if (!this.isBatch) {
      this.ids.push(this.editItem.id);
    }
    let data = { ids: this.ids, checkResult: this.checkResult, checkRemark: checkRemark, bacthType: this.messageTypeId };
    console.log(data);
    this.apiService.bacthCheck(data).then(response => {
      this.isVisible = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.checkRemark = '';
        this.search();
      } else {
        this.msg.error('操作失败');
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
    this.checkOptionsRowOne.forEach((item: any) => {
      item.checked = false;
    });
    this.checkOptionsRowTwo.forEach((item: any) => {
      item.checked = false;
    });
  }

  turnPage(page: number) {
    this.pageIndex = page;
    this.search();
  }

  checkBoxFun(list: any) {
    console.log(list);
    this.checkList = list;
  }

  search() {
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgName: this.orgName,
      operateId: this.operateId,
      offline: this.offline,
      deviceType: this.deviceType,
      reportTimeStart: this.reportTimeStart,
      reportTimeEnd: this.reportTimeEnd,
      closed: true
    };

    this.historyData = {
      closed: true
    };

    // if (this.deviceInfo.category==="网关") {
    // 	this.historyData['gatewayId'] = this.deviceInfo.id
    // } else {
    // 	this.historyData['sensorId'] = this.deviceInfo.id
    // }

    if (this.messageTypeId == '1') {
      // 预警
      this.searchFireWarn(data);
    } else if (this.messageTypeId == '2') {
      // 告警
      this.searchFireAlarm(data);
    } else if (this.messageTypeId == '3') {
      // 事件
      this.searchDeviceEvent(data);
    } else {
      // 故障
      this.searchDeviceFault(data);
    }
  }

  rest() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      closed: true
    };
    this.orgName = '';
    this.operateId = '-1';
    this.offline = '-1';
    this.reportTimeStart = '';
    this.reportTimeEnd = '';
    this.typeId = '-1';
    if (this.messageTypeId == '1') {
      // 预警
      this.searchFireWarn(data);
    } else if (this.messageTypeId == '2') {
      // 告警
      this.searchFireAlarm(data);
    } else if (this.messageTypeId == '3') {
      // 事件
      this.searchDeviceEvent(data);
    } else {
      // 故障
      this.searchDeviceFault(data);
    }
  }

  searchDeviceFault(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.searchDeviceFault(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: any) => {
          element.index = index;
          // element.messageType = "故障"
          element.processTypeText = this.messageStatusMap[element.processType];
          if (element.subjectType == 'SYSTEM') {
            element.subjectName = '系统';
            element.checkRemark = element.content;
          }
        });
        this.dataSet = response.data.content;
        this.total = response.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  setDevice() {}

  closeDetail() {
    this.isVisibleDetail = false;
  }

  getOrgInfo() {
    this.apiService.findOrgById(this.editItem.orgId).then(response => {
      console.log(response);
      if (response && response.data) {
        this.orgInfo = response.data;
        if (this.orgInfo.provinceId) {
          this.orgInfo.SSQ = this.enumService.getSSQ(this.orgInfo.provinceId, this.orgInfo.cityId, this.orgInfo.districtId);
        } else {
          this.orgInfo.SSQ = '-';
        }
        let time = new Date().getTime();
        if (this.orgInfo.serveEndTime && time < this.orgInfo.serveEndTime) {
          this.orgInfo.contractStatus = '有效';
        } else if (this.orgInfo.serveEndTime && time > this.orgInfo.serveEndTime) {
          this.orgInfo.contractStatus = '过期';
        } else if (this.orgInfo.serveStartTime && time > this.orgInfo.serveStartTime) {
          this.orgInfo.contractStatus = '未开始服务';
        }

        this.processLogSearch();
      }
    });
  }

  processLogSearch() {
    if (this.messageTypeId == 1) {
      this.accusativeType = 'FIRE_WARN';
    } else if (this.messageTypeId == 2) {
      this.accusativeType = 'FIRE_ALARM';
    } else if (this.messageTypeId == 4) {
      this.accusativeType = 'DEVICE_FAULT';
    } else if (this.messageTypeId == 3) {
      this.accusativeType = 'EVENT';
    }
    this.apiService
      .processLogSearch({ accusativeId: this.editItem.id, accusativeType: this.accusativeType, page: this.pageIndex2 - 1, size: 10 })
      .then(response => {
        console.log(response);
        if (response && response.data) {
          response.data.content.forEach((element: any, index: any) => {
            element.index = index;
            element.userTypeText = this.userTypeMap[element.accusativeType];
            element.processTypeText = this.messageStatusMap[element.processType];
            if (element.subjectType == 'SYSTEM') {
              element.subjectName = '系统';
              element.checkRemark = element.content;
            }
          });
          this.dataSet2 = response.data.content;
          this.total2 = response.data.totalElements;
        } else {
          this.dataSet2 = [];
          this.total2 = 0;
        }
      });
  }

  turnPage2(page: number) {
    this.pageIndex2 = page;
    this.processLogSearch();
  }
}
