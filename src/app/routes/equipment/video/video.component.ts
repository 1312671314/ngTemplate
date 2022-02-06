import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
// import EZUIKit from 'ezuikit-js';
declare let EZUIKit: any; //声明$对象
@Component({
  selector: 'app-equipment-video',
  templateUrl: './video.component.html'
})
export class EquipmentVideoComponent implements OnInit {
  teadList: any;
  keyNameList: any;
  dataSet: any;
  pageIndex = 1;
  pageIndex2 = 1;
  pageSize = 10;
  pageSize2 = 10;
  total = 0;
  orgName: any;
  operateId: any;
  offline: any;
  powerStatusMap: any;
  deviceTypeList: any;
  deviceTypeMap: any;
  operationList: any;
  operationMap: any;
  deviceTypeArr: any;
  pointList: any;
  editItem: any;
  isVisible = false;
  teadList2: any;
  keyNameList2: any;
  checkList: any;
  isVisibleDetail = false;
  checkCode = '';
  flowUrl = '';
  hdUrl = '';
  replayUrl = '';
  videoInfo: any;
  isVisibleaAddVideo = false;
  place = '';
  serialNum = '';
  typeId: any;
  orgList: any;
  nzFilterOption = (): boolean => true;
  orgName2: any;
  org: any;
  orgInfo: any;
  checkCode2: any;
  isVisibleInfo = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: _HttpClient,
    private modal: ModalHelper,
    private apiService: ApiService,
    private enumService: EnumService,
    private msg: NzMessageService
  ) {
    this.pointList = [];
    this.deviceTypeArr = [];
    this.powerStatusMap = {
      WIRED: '市电',
      BACKUP: '备电',
      BATTERY: '电池'
    };
    this.teadList = [
      // { name: '设备类型' },
      { name: '联网单位' },
      { name: '安装位置' },
      { name: '设备型号' },
      { name: '设备编号' },
      { name: '通讯状态' },
      { name: '工作状态' },
      { name: '供电方式' },
      // { name: '实时参数' },
      { name: '关联网关' },
      { name: '操作', widthSet: true }
    ];
    this.keyNameList = [
      // { type: 'text', name: 'deviceType' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'workStatusText' },
      { type: 'text', name: 'powerStatusText' },
      // { type: 'popUp', name: 'parameter' },
      { type: 'tooltip', name: 'gatewayNoAbbreviation', allText: 'gatewayNo' },
      {
        type: 'buttonList',
        buttons: [
          { text: '编辑', index: 1 }
          // { text: '详情', index: 2 }
        ]
      }
    ];

    this.teadList2 = [{ name: '安装位置' }, { name: '设备型号' }, { name: '设备编号' }, { name: '通讯状态' }, { name: '工作状态' }];
    this.keyNameList2 = [
      { type: 'text', name: 'place' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'tooltip', name: 'abbreviation', allText: 'serialNum' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'workStatusText' }
    ];
    this.dataSet = [];
  }
  playr: any;

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
      }
    });
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

  search() {
    const data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgName: this.orgName,
      operateId: this.operateId,
      offline: this.offline,
      deleted: false,
      // typeId: this.typeId
      deviceType: '消防视频'
    };
    this.getData(data);
  }

  ngOnInit(): void {
    this.deviceTypeArr = this.enumService.deviceTypeArr;
    this.findAllDeviceType();
    // this.createPlayer();
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

  getPointList() {
    let data = {
      page: 0,
      size: 2000,
      orgId: this.editItem.orgId
    };
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
          element.powerStatusText = this.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
          element.parameter = '查看数据';
          element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
          element.gatewayNoAbbreviation = this.enumService.getSerialNumAbbreviation(element.gatewayNo);
        });
        this.pointList = response.data.content;
        // this.total = response.data.totalElements; //总条数
      } else {
        this.pointList = [];
        // this.total = 0; //总条数
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
          element.deviceType = this.deviceTypeMap[element.typeId].type;
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId].typeName;
          element.offlineText = element.offline ? '离线' : '在线';
          element.powerStatusText = this.powerStatusMap[element.powerStatus];
          element.workStatusText = this.enumService.deviceStatus(element);
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

  createPlayer() {
    this.playr = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken: 'at.0xtj6xwn1pjqxm1mdw6rb2cjblw5tktk-7sm104i2ge-06ezbyr-igavylwtg',
      url: 'ezopen://open.ys7.com/C50669725/1.hd.live',
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

  fullScreen() {
    let playPromise = this.playr.fullScreen();
    playPromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  play() {
    let playPromise = this.playr.play();
    playPromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  stop() {
    let stopPromise = this.playr.stop();
    stopPromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  getOSDTime() {
    let getOSDTimePromise = this.playr.getOSDTime();
    getOSDTimePromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  //  getOSDTime2() {
  //   let getOSDTimePromise = this.playr2.getOSDTime();
  //   getOSDTimePromise.then((data:any)=>{
  //     console.log("promise 获取 数据",data)
  //   })
  // }
  capturePicture() {
    let capturePicturePromise = this.playr.capturePicture();
    capturePicturePromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  openSound() {
    let openSoundPromise = this.playr.openSound();
    openSoundPromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  closeSound() {
    let closeSoundPromise = this.playr.closeSound();
    closeSoundPromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  startSave() {
    let startSavePromise = this.playr.startSave();
    startSavePromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }
  stopSave() {
    let stopSavePromise = this.playr.stopSave();
    stopSavePromise.then((data: any) => {
      console.log('promise 获取 数据', data);
    });
  }

  turnPage(page: any) {
    this.pageIndex = page;
    this.search();
  }
  editFun(item: any) {
    this.editItem = item;
    if (item.btnIndex == 1) {
      this.isVisibleDetail = true;
      this.getByDevice();
    } else {
      this.isVisibleInfo = true;
    }
  }
  getByDevice() {
    this.apiService.getByDeviceId(this.editItem.id).then(response => {
      if (response && response.data) {
        console.log(response);
        this.videoInfo = response.data;
        this.checkCode = response.data.checkCode;
        this.flowUrl = response.data.flowUrl;
        this.hdUrl = response.data.hdUrl;
        this.replayUrl = response.data.replayUrl;
      }
    });
  }

  getAlreadyPoint() {
    this.apiService.findDTOListByCameraId(this.editItem.id).then(response => {
      if (response && response.data) {
        console.log(response);
        // this.deviceTypeList = response.data;
        // this.deviceTypeMap = this.enumService.getMap(this.deviceTypeList);
      }
    });
  }

  checkFun(item: any) {}
  cancel() {
    this.isVisible = false;
  }

  onOk() {
    this.isVisible = false;
    this.apiService.findDTOListByCameraId(this.editItem.id).then(response => {
      if (response && response.data) {
        console.log(response);
        // this.deviceTypeList = response.data;
        // this.deviceTypeMap = this.enumService.getMap(this.deviceTypeList);
      }
    });
  }
  checkBoxFun(list: any) {
    console.log(list);
    this.checkList = list;
  }

  turnPage2(page: any) {}

  handleCancel2() {
    this.isVisibleDetail = false;
  }
  handleOk2() {
    let data = {
      id: this.videoInfo.id,
      checkCode: this.checkCode,
      flowUrl: this.flowUrl,
      hdUrl: this.hdUrl,
      replayUrl: this.replayUrl
    };
    this.apiService.deviceAdditional(data).then(response => {
      if (response && response.data) {
        this.ngOnInit();
        this.isVisibleDetail = false;
        this.msg.success('操作成功');
      } else {
        this.msg.error('编辑失败');
      }
    });
  }

  add() {
    this.isVisibleaAddVideo = true;
  }

  addOk() {
    let data = {
      typeId: 52,
      place: this.place,
      serialNum: this.serialNum,
      checkCode: this.checkCode2,
      orgId: this.orgInfo ? this.orgInfo.id : ''
    };
    data = this.apiService.filterData(data);
    this.apiService.createDeviceInfo(data).then(response => {
      if (response && response.data) {
        this.isVisibleaAddVideo = false;
        this.msg.success('添加成功');
      } else {
        this.msg.error(response.message);
      }
    });
  }
  addCancel() {
    this.isVisibleaAddVideo = false;
  }

  searchOrg(val: any) {
    console.log(this.orgInfo);
    let data = {
      orgName: val ? val : '',
      page: 0,
      size: 10
    };
    console.log(val);
    data = this.apiService.filterData(data);
    this.apiService.getOrgList(data).then(response => {
      if (response && response.data) {
        this.orgList = response.data.content;
      } else {
        this.orgList = [];
      }
    });
  }
}
