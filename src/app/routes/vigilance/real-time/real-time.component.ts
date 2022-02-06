import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

declare let EZUIKit: any; //声明$对象
@Component({
  selector: 'app-vigilance-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class VigilanceRealTimeComponent implements OnInit {
  teadList: any;
  dataSet: any;
  dataSetHistory: any;
  total = 0;
  totalHistory: any;
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
  deviceType: any;
  operationList: any;
  operationMap: any;
  deviceTypList: any;
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
  isVisibleBatchCheck: boolean;
  isVisibleBatchCheckTrue: boolean;
  deviceTypeArr: any;
  checkOptionsRowThree: any;
  checkOptionsRowFour: any;
  teadListHistory: any;
  keyNameListHistory: any;
  pageIndexHistory = 1;
  pageSizeHistory = 10;
  userTypeMap: any;
  messageStatusMap: any;
  accusativeType: any;
  pointList: any;
  pointTeadList: any;
  pointKeyNameList: any;
  powerStatusMap: any;
  isShowPointList: any;
  isVisibleStatus: any;
  teadList2: any;
  keyNameList2: any;
  statusList: any;
  isolateRemindEndTime: any;
  dataSet7: any;
  teadList7: any;
  keyNameList7: any;
  buildAttributeMap: any;
  materialMap: any;
  editItemImg: any;
  imgTitle = '';
  imgList: any;
  isVisibleImgList = false;
  fileList: any;
  blueprint: any;
  evacuationImages: any;
  keyNameList3 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'name' },
    { type: 'text', name: 'floor' },
    { type: 'text', name: 'roomsNumber' },
    { type: 'text', name: 'square' },
    { type: 'text', name: 'materialText' },
    { type: 'text', name: 'buildAttributeText' },
    { type: 'imgList', name: 'images' },
    { type: 'imgList', name: 'blueprint' },
    { type: 'imgList', name: 'evacuationImages' }
    // { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
  ];
  teadList3 = [
    { name: '序号', type: 'index' },
    { name: '建筑名称' },
    { name: '楼层数' },
    { name: '房间数' },
    { name: '面价(平方米)' },
    { name: '结构类型' },
    { name: '属性' },
    { name: '外观照' },
    { name: '平面图' },
    { name: '疏散图' }
    // { name: '操作' }
  ];
  dataSet3: any;
  imagesList = [];
  keyNameList4: any;
  teadList4: any;
  total4 = 0;
  boxShow = 'none';
  editItem4: any;
  flowUrl: any;
  hdUrl: any;
  replayUrl: any;
  token: any;
  player: any;
  dataSet4: any;
  pageIndex4 = 10;
  pageSize4 = 10;
  constructor(
    private msg: NzMessageService,
    private router: Router,
    private modal: ModalHelper,
    private apiService: ApiService,
    private enumService: EnumService
  ) {
    this.operationMap = {};
    this.imgList = [];
    this.isVisibleStatus = false;
    this.checkList = [];
    this.isVisibleBatchCheck = false;
    this.isVisibleBatchCheckTrue = false;
    this.isBatch = false; //不是批量
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;
    this.messageTypeId = '0';
    this.ids = [];
    this.date = [];
    this.orgInfo = {
      ownershipType: ''
    };
    this.checkResultMap = {
      0: '未确认',
      1: '火警',
      2: '误报'
    };
    this.teadList = [
      { name: '序号', type: 'index' },
      { name: '联网单位' },
      { name: '设备名称' },
      { name: '安装位置' },
      // { name: '上报时间' },
      { name: '上报时间' },
      { name: '警情类型' },
      { name: '处理状态' },
      { name: '最后处理人' },
      { name: '警情次数' },
      { name: '处理结果' },
      { name: '实时参数' },
      { name: '快速操作', widthSet: true }
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
      { type: 'text', name: 'checkRemark' },
      { type: 'popUp', name: 'parameter' },
      {
        type: 'buttonList',
        buttons: [
          { text: '误报', index: 1 },
          { text: '隔离', index: 2 },
          { text: '详情', index: 3 }
        ]
      }
    ];

    this.teadListHistory = [
      { name: '序号', type: 'index' },
      { name: '处理时间' },
      { name: '类型' },
      { name: '处理人' },
      { name: '处理方式' },
      { name: '处理备注' }
    ];
    this.keyNameListHistory = [
      { type: 'index', name: 'index' },
      { type: 'time', name: 'createTime' },
      { type: 'text', name: 'userTypeText' },
      { type: 'text', name: 'subjectName' },
      { type: 'text', name: 'processTypeText' },
      { type: 'tooltip', name: 'content' }
    ];

    this.pointTeadList = [
      { name: '序号', type: 'index' },
      { name: '点位名称' },
      { name: '安装位置' },
      { name: '设备型号' },
      { name: '设备编号' },
      { name: '通信状态' },
      { name: '工作状态' }
      // { name: '供电方式' }
    ];

    this.pointKeyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'deviceType' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'isolated' }
      // { type: 'text', name: 'powerStatusText' }
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

    this.checkOptionsRowThree = [
      { label: '设备调试', value: '设备调试' },
      { label: '故障扰民', value: '故障扰民' },
      { label: '用户装修', value: '用户装修' }
    ];
    this.checkOptionsRowFour = [
      { label: '厨房燃气着火', value: '厨房燃气着火' },
      { label: '人为用火不慎', value: '人为用火不慎' },
      { label: '电器火灾着火', value: '电器火灾着火' },
      { label: '现场模拟演习', value: '现场模拟演习' }
    ];

    this.powerStatusMap = {
      WIRED: '市电',
      BACKUP: '备电',
      BATTERY: '电池'
    };
    this.orgName = '';
    this.operateId = '-1';
    this.offline = '-1';
    this.orgTypeMap = {};
    this.industryMap = {};
    this.userTypeMap = {};
    this.messageStatusMap = {};

    this.teadList2 = [{ name: '序号', type: 'index' }, { name: '参数名' }, { name: '参数值' }, { name: '上报时间' }];

    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'showValue' },
      { type: 'time', name: 'readTime' }
    ];
    this.deviceType = '-1';
    this.dataSet7 = [];
    this.keyNameList7 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'levelName' },
      { type: 'text', name: 'phone' }
      // { type: 'time', name: 'createTime' }
      // { type: "text", name: "createTimeStart" },
    ];
    this.teadList7 = [
      { name: '序号', type: 'index' },
      { name: '姓名' },
      { name: '通知等级' },
      { name: '手机号' }
      // { name: '持证档案' }
      // { name: "状态" },
    ];

    this.total4 = 0;
    this.teadList4 = [
      { name: '安装位置' },
      { name: '设备型号' },
      { name: '设备编号' },
      { name: '通讯状态' },
      { name: '工作状态' },
      { name: '操作' }
    ];
    this.keyNameList4 = [
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'workStatusText' },
      {
        type: 'buttonList',
        buttons: [
          { text: '直播', index: 1 },
          { text: '回放', index: 2 }
        ]
      }
    ];
  }

  // 建筑类型
  orgBuildTypeFindAll() {
    this.apiService.orgBuildTypeFindAll().then(response => {
      if (response && response.data) {
        console.log(response);
        this.buildAttributeMap = this.enumService.getMap(response.data);
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

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
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

  // 设备类型
  findAllDeviceType() {
    this.apiService.findAllDeviceType().then(response => {
      if (response && response.data) {
        // this.deviceTypeList = response.data;
        this.deviceTypeMap = this.enumService.getMap(response.data);
      }
    });
  }

  ngOnInit(): void {
    this.findAllDeviceType();
    this.orgBuildTypeFindAll();
    this.orgTypeFindAll();
    this.industryTypeFindAll();
    this.getOperationList();
    this.charactarSearch();
    this.searchLevel();
    this.materialMap = this.enumService.materialMap;
    this.messageStatusMap = this.enumService.messageStatausMap;
    this.messageTypeArr = this.enumService.messageTypeArr;
    this.userTypeMap = this.enumService.userTypeMap;
    this.businessArr = this.enumService.businessArr;
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

  orgTypeFindAll() {
    this.apiService.orgTypeFindAll().then(response => {
      if (response && response.data) {
        this.orgTypeArr = response.data;
        this.orgTypeMap = this.enumService.getMap(this.orgTypeArr);
        console.log(this.orgTypeArr);
        console.log(this.orgTypeMap);
      }
    });
  }

  orgContactInfo() {
    //获取紧急联系人
    this.apiService.orgContactInfo({ orgId: this.orgInfo.id }).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.levelText = this.levelMap[element.level];
          element.charactarText = this.charactarMap[element.charactarId];
        });
        this.dataSet7 = response.data;
      }
    });
  }

  checkOptionsChangesOne(event: any) {
    console.log(event);
  }

  checkOptionsChangesTwo(event: any) {
    console.log(event);
  }

  checkOptionsChangesThree(event: any) {
    console.log(event);
  }

  checkOptionsChangesFour(event: any) {
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
          element.parameter = '查看数据';
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  searchFireWarn(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.searchFireWarn(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: any) => {
          element.index = index;
          element.messageType = '预警';
          element.parameter = '查看数据';
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
        });
        this.dataSet = response.data.content;
        this.total = response.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  //   searchFireAlarmHistory(data: any) {
  //     data = this.apiService.filterData(data);
  //     this.apiService.searchFireAlarm(data).then(response => {
  //       if (response && response.data) {
  //         response.data.content.forEach((element: any, index: any) => {
  //           element.index = index;
  //           element.messageType = '告警';
  //           element.checkResultText = this.checkResultMap[element.checkResult];
  //         });
  //         this.dataSetHistory = response.data.content;
  //         this.totalHistory = response.totalElements; //总条数
  //       } else {
  //         this.dataSetHistory = [];
  //         this.totalHistory = 0; //总条数
  //       }
  //     });
  //   }

  //   searchFireWarnHistory(data: any) {
  //     data = this.apiService.filterData(data);
  //     this.apiService.searchFireWarn(data).then(response => {
  //       if (response && response.data) {
  //         response.data.content.forEach((element: any, index: any) => {
  //           element.index = index;
  //           element.messageType = '预警';
  //         });
  //         this.dataSetHistory = response.data.content;
  //         this.totalHistory = response.totalElements; //总条数
  //       } else {
  //         this.dataSetHistory = [];
  //         this.totalHistory = 0; //总条数
  //       }
  //     });
  //   }

  processLogSearch() {
    if (this.messageTypeId == 1) {
      this.accusativeType = 'FIRE_WARN';
    } else if (this.messageTypeId == 0) {
      this.accusativeType = 'FIRE_ALARM';
    }
    this.apiService
      .processLogSearch({
        accusativeId: this.editItem.id,
        accusativeType: this.accusativeType,
        page: this.pageIndexHistory - 1,
        size: 10
      })
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
          this.dataSetHistory = response.data.content;
          this.totalHistory = response.data.totalElements; //总条数
        } else {
          this.dataSetHistory = [];
          this.totalHistory = 0; //总条数
        }
      });
  }

  onChange(result: Date[]): void {
    this.reportTimeStart = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.reportTimeEnd = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  editFun(event: any) {
    this.editItem = event;
    // 误报
    if (event.btnIndex == 1) {
      this.ids = [];
      this.isBatch = false;
      this.isVisible = true;
      this.checkResult = 2;
    } else if (event.btnIndex == 2) {
      // 隔离
      //   this.checkResult = 2;
      this.isBatch = false;
      this.isVisibleBatchCheck = true;
    } else {
      // this.router.navigate(['/vigilance/real-time-detail'], {
      // 	queryParams: {id:event.id,orgId:event.orgId}
      // })
      //   this.editItem = event;
      this.isVisibleDetail = true;
      if (!this.editItem.sensorId) {
        this.findByGatewayId();
      }
      this.getOrgInfo();
    }
  }

  // 通过网关查找网关下的点位
  findByGatewayId() {
    this.isShowPointList = true;
    this.apiService.findByGatewayId(this.editItem.gatewayId).then(response => {
      if (response && response.data) {
        let arr: any[] = [];
        response.data.forEach((element: any, index: any) => {
          console.log(element);
          if (this.editItem.gatewayId != element.id) {
            //型号
            element.index = index;
            element.deviceType = this.deviceTypeMap[element.typeId].type;
            //类型
            element.deviceTypeName = this.deviceTypeMap[element.typeId].typeName;
            element.offlineText = element.offline ? '离线' : '在线';
            element.isolated = element.isolated ? '隔离' : '未隔离';
            // element.powerStatusText = this.powerStatusMap[element.powerStatus];
            element.workStatusText = this.enumService.deviceStatus(element);
            arr.push(element);
          }
        });
        this.pointList = arr;
      } else {
        this.pointList = [];
      }
    });
  }
  // 成灾或者误报
  batchCheck(index: any) {
    this.checkResult = index;
    let isHasCheck = false;
    if (this.checkList && this.checkList.length != 0) {
      this.checkList.forEach((item: any) => {
        if (item.checked) {
          isHasCheck = true;
        }
      });
    }

    if (isHasCheck) {
      if (index == 2) {
        this.isVisible = true;
      } else {
        this.isVisibleBatchCheckTrue = true;
      }
    } else {
      this.msg.warning('至少选择一条警情进行批量操作!');
    }
  }

  dateOnChange(date: any) {
    console.log(date);
    this.isolateRemindEndTime = new Date(date).getTime();
  }
  // 隔离
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
      this.isVisibleBatchCheck = true;
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
    let data = { ids: this.ids, checkRemark: checkRemark, bacthType: this.messageTypeId, isolateRemindEndTime: this.isolateRemindEndTime };
    console.log(data);
    this.apiService.batchIsolate(data).then(response => {
      this.isVisible = false;
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
        this.msg.error(response.message);
      }
    });
  }

  handleOk2() {
    this.ids = [];
    let checkRemark = this.checkRemark;
    this.checkOptionsRowThree.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });

    if (this.checkList.length != 0 && this.isBatch) {
      this.checkList.forEach((item: any) => {
        if (item.checked) {
          this.ids.push(item.id);
        }
      });
    } else if (!this.isBatch) {
      this.ids.push(this.editItem.id);
    }
    let data = {
      ids: this.ids,
      checkResult: this.checkResult,
      checkRemark: checkRemark,
      bacthType: this.messageTypeId,
      isolateRemindEndTime: this.isolateRemindEndTime
    };
    console.log(data);
    this.apiService.batchIsolate(data).then(response => {
      this.isVisibleBatchCheck = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.checkRemark = '';
        this.search();
      } else {
        this.msg.error(response.message);
      }
    });
  }

  handleOk3() {
    this.ids = [];
    let checkRemark = this.checkRemark;
    this.checkOptionsRowFour.forEach((element: any) => {
      if (element.checked) {
        checkRemark = checkRemark + element.value + ',';
      }
    });
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
      this.isVisibleBatchCheckTrue = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.checkRemark = '';
        this.search();
      } else {
        this.msg.error(response.message);
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

  handleCancel2() {
    this.isVisibleBatchCheck = false;
    this.checkOptionsRowThree.forEach((item: any) => {
      item.checked = false;
    });
  }

  handleCancel3() {
    this.isVisibleBatchCheckTrue = false;
    this.checkOptionsRowFour.forEach((item: any) => {
      item.checked = false;
    });
  }

  turnPage(page: number) {
    this.pageIndex = page;
    this.search();
  }

  turnPageHistory(page: number) {
    this.pageIndexHistory = page;
    this.processLogSearch();
  }

  checkBoxFun(list: any) {
    console.log(list);
    this.checkList = list;
  }

  search() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgName: this.orgName,
      operateId: '',
      offline: this.offline,
      deviceType: this.deviceType,
      reportTimeStart: this.reportTimeStart,
      reportTimeEnd: this.reportTimeEnd,
      closed: false
    };
    if (this.messageTypeId == '1') {
      // 预警
      this.searchFireWarn(data);
    } else {
      // 告警
      this.searchFireAlarm(data);
    }
  }

  rest() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      closed: false
    };
    this.orgName = '';
    this.operateId = '-1';
    this.offline = '-1';
    this.reportTimeStart = '';
    this.reportTimeEnd = '';
    this.deviceType = '-1';
    if (this.messageTypeId == '1') {
      // 预警
      this.searchFireWarn(data);
    } else {
      // 告警
      this.searchFireAlarm(data);
    }
  }

  setDevice(type: any) {
    if (type == 1) {
      // 误报确认
      this.ids = [];
      this.isBatch = false;
      this.isVisible = true;
      this.checkResult = 2;
    } else if (type == 2) {
      // 设备复位
      // if (this.editItem.category==="网关") {
      // 	this.historyData['gatewayId'] = this.deviceInfo.id
      // } else {
      // 	this.historyData['sensorId'] = this.deviceInfo.id
      // }
      this.apiService.stopLightAndVoice(this.editItem.id).then(response => {
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
    } else if (type == 3) {
      // 设备隔离
      this.isBatch = false;
      this.isVisibleBatchCheck = true;
    } else if (type == 4) {
      // 确认成灾
      this.ids = [];
      this.isBatch = false;
      this.isVisibleBatchCheckTrue = true;
      this.checkResult = 1;
    } else if (type == 5) {
      // 语音外呼
      this.sendMessageByHand('phone');
    } else if (type == 6) {
      // 推送短信
      this.sendMessageByHand('sms');
    }
  }

  sendMessageByHand(type: any) {
    let num = 30;
    if (this.messageTypeId == 1) {
      num = 40;
    } else {
      num = 30;
    }
    this.apiService.sendMessageByHand(type, num, this.editItem.id).then(response => {
      if (response && response.data) {
        this.msg.success('操作成功');
      } else {
        this.msg.error('操作失败');
      }
    });
  }

  closeDetail() {
    this.isVisibleDetail = false;
  }

  popUpFun(item: any) {
    console.log(item);
    this.getDeviceStatus(item);
    this.isVisibleStatus = true;
  }

  isVisibleOut(type: any) {
    this.isVisibleStatus = type;
  }

  getDeviceStatus(item: any) {
    let id;
    if (item.sensorId) {
      id = item.sensorId;
    } else {
      id = item.gatewayId;
    }
    this.apiService.getDeviceStatus(id).then(response => {
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

        if (this.orgInfo.images) {
          this.orgInfo.images = JSON.parse(this.orgInfo.images);
        } else {
          this.orgInfo.images = [];
        }

        if (this.orgInfo.logo) {
          this.orgInfo.logo = JSON.parse(this.orgInfo.logo);
        } else {
          this.orgInfo.logo = [];
        }

        if (this.orgInfo.certImage) {
          this.orgInfo.certImage = JSON.parse(this.orgInfo.certImage);
        } else {
          this.orgInfo.certImage = [];
        }

        this.historyData = {
          closed: true
        };
        // 获取单位紧紧联系人
        this.orgContactInfo();
        //历史记录
        this.processLogSearch();
        // 单位建筑
        this.orgBuildInfo();
      }
    });
  }

  orgBuildInfo() {
    this.apiService.orgBuildInfo(this.orgInfo.id).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.buildAttributeText = this.buildAttributeMap[element.buildAttribute]
            ? this.buildAttributeMap[element.buildAttribute].name
            : '-';
          element.materialText = this.materialMap[element.material] ? this.materialMap[element.material].name : '-';
        });
        this.dataSet3 = response.data;
      }
    });
  }

  viewImg(item: any) {
    console.log(item);
    this.editItemImg = item;
    if (item.imgType == 'images') {
      this.imgTitle = '外观图';
    } else if (item.imgType == 'blueprint') {
      this.imgTitle = '平面图';
    } else if (item.imgType == 'evacuationImages') {
      this.imgTitle = '疏散图';
    } else {
      this.imgTitle = '图片';
    }

    if (item[item.imgType] && item[item.imgType].length != 0) {
      this.imgList = JSON.parse(item[item.imgType]);
    } else {
      this.imgList = [];
    }
    this.isVisibleImgList = true;
  }

  getImgList(list: any) {
    this.imagesList = list;
  }
  imgListClose() {
    this.isVisibleImgList = false;
  }

  closeVideo() {
    this.boxShow = 'none';
  }

  editFun4(item: any) {
    this.editItem4 = item;
    this.getByDevice();
    if (item.btnIndex == 1) {
      this.editItem4.View = 'hdUrl';
    } else {
      this.editItem4.View = 'replayUrl';
    }
  }
  getByDevice() {
    this.apiService.getByDeviceId(this.editItem4.id).then(response => {
      if (response && response.data) {
        console.log(response);
        this.flowUrl = response.data.flowUrl;
        this.hdUrl = response.data.hdUrl;
        this.replayUrl = response.data.replayUrl;
        this.yinshiyunGetToken();
      }
    });
  }

  yinshiyunGetToken() {
    this.apiService.yinshiyunGetToken().then(response => {
      if (response && response.data) {
        console.log(response);
        this.token = response.data;
        this.createPlayer();
      }
    });
  }

  showVideo() {
    this.boxShow = 'block';
  }

  createPlayer() {
    this.showVideo();
    let url = '';
    switch (this.editItem4.View) {
      case 'hdUrl':
        url = this.hdUrl;
        break;
      case 'replayUrl':
        url = this.hdUrl;
        break;
    }

    this.player = new EZUIKit.EZUIKitPlayer({
      id: 'fault-container', // 视频容器ID
      accessToken: this.token,
      // url: 'ezopen://open.ys7.com/C50669725/1.hd.live',
      url: url,
      template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      autoplay: true,
      // 视频上方头部控件
      header: ['capturePicture', 'save', 'zoom'], // 如果templete参数不为simple,该字段将被覆盖
      // 视频下方底部控件
      footer: ['talk', 'broadcast', 'hd', 'fullScreen'], // 如果template参数不为simple,该字段将被覆盖
      // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      // plugin: ['talk'],                       // 加载插件，talk-对讲
      // controls: true, //['play','voice','hd','fullScreen'], // 视频控制相关控件，如果template参数不为simple,该字段将被覆盖
      openSoundCallBack: (data: any) => console.log('开启声音回调', data),
      closeSoundCallBack: (data: any) => console.log('关闭声音回调', data),
      startSaveCallBack: (data: any) => console.log('开始录像回调', data),
      stopSaveCallBack: (data: any) => console.log('录像回调', data),
      capturePictureCallBack: (data: any) => console.log('截图成功回调', data),
      fullScreenCallBack: (data: any) => console.log('全屏回调', data),
      fullScreenChangeCallBack: (data: any) => console.log('全屏变化回调', data),
      getOSDTimeCallBack: (data: any) => console.log('获取OSDTime回调', data),
      handleSuccess: (data: any) => {
        console.log('播放成功回调', data);
      },
      handleError: (data: any) => console.log('播放失败回调1', data),
      handleTalkSuccess: () => console.log('对讲成功回掉'),
      handleTalkError: (data: any) => {
        console.log('对讲失败', data);
      },
      decoderVersion: 'v3.4',
      width: 800,
      height: 600
    });
  }

  turnPage4(page: number) {
    this.pageIndex4 = page;
    let data = {
      page: this.pageIndex4 - 1,
      size: this.pageSize4,
      orgId: this.editItem.orgId,
      deviceType: '消防视频'
    };
    this.getVideoList(data);
  }

  getVideoList(data: object) {
    data = this.apiService.filterData(data);
    this.apiService.getDevice(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.orgName = element.orgName ? element.orgName : '无';
          //型号
          element.deviceType = this.deviceTypeMap[element.typeId].type;
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId].typeName;
          element.offlineText = element.offline ? '离线' : '在线';
          // element.powerStatusText = this.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
          element.gatewayNoAbbreviation = this.enumService.getSerialNumAbbreviation(element.gatewayNo);
        });
        this.dataSet4 = response.data.content;
        this.total4 = response.data.totalElements; //总条数
      } else {
        this.dataSet4 = [];
        this.total4 = 0; //总条数
      }
    });
  }
}
