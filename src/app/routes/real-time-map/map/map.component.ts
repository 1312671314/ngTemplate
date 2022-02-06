import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { EventsService } from 'src/app/modules/app/services/events.service';
import { SocketHandler } from 'src/app/modules/app/services/socket-handler.service';
import Audio, { AudioType } from 'ts-audio';
import * as echarts from 'echarts';
import { Chart } from '@antv/g2';
// import G2 from '@antv/g2';
import _dataView from '@antv/data-set';
import { Data } from '@antv/g2/lib/interface';
import { Global } from 'src/app/modules/app/services/global.service';
// import { DatePipe } from '@angular/common';
// import { DataSet } from '@antv/data-set';
type EChartsOption = echarts.EChartsOption;
declare let EZUIKit: any; //声明$对象
declare var AMap: {
  Map: new (arg0: string, arg1: AMap.MapOptions) => any;
  Icon: new (arg0: {
    size: any;
    image: string; // Icon的图像
    imageSize: any;
  }) => any;
  Size: new (arg0: number, arg1: number) => any;
  Marker: any;
  Pixel: new (arg0: number, arg1: number) => any;
  DistrictSearch: any;
  Polygon: any;
  InfoWindow: any;
  Weather: any;
  plugin: any;
};
@Component({
  selector: 'app-real-time-map-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class RealTimeMapMapComponent implements OnInit {
  teadList: any;
  keyNameList: any;
  dataSet: any;
  total = 0;
  pageIndex = 1;
  pageSize = 0;
  checkResultMap: any;
  messageStatusMap: any;
  orgInfo: any;
  orgTypeMap: any;
  operationMap: any;
  dateText = '';
  accusativeType = '';
  editItem: any;
  pageIndexHistory = 1;
  dataSetHistory: any;
  totalHistory: any;
  userTypeMap: any;
  hanlder: any;
  time = Date.now();
  interval: any = undefined;
  audio: any = undefined;
  audioType = '';
  isRed = false;
  isOrange = false;
  isYellow = false;
  // alarmMusic: any;
  // warnMusic: any;
  // faultMusic: any;
  rooms = 0;
  messageId: any;
  idListAll: any;
  isVisible = false;
  refreshInterval: any;
  weekMap: any = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  };
  teadListHistory = [{ name: '处理时间' }, { name: '类型' }, { name: '处理人' }, { name: '处理方式' }, { name: '处理备注' }];
  keyNameListHistory = [
    { type: 'time', name: 'createTime' },
    { type: 'text', name: 'userTypeText' },
    { type: 'text', name: 'subjectName' },
    { type: 'text', name: 'processTypeText' },
    { type: 'tooltip', name: 'content' }
  ];
  pageSizeHistory = 10;
  containerId = `${new Date().getTime()}`;
  mapOptions: AMap.MapOptions;
  map: any;
  marker: any;
  placeInfo: any;
  locationCache: [number, number] | undefined;
  scale = 16;
  address = '';
  searchText = '';
  moveBySelect = false;
  searchItems: any[] = [];
  position: any;
  lng: number;
  lat: number;
  messageText = '';
  // this.orgId
  orgId: any;
  dataSet7: any;
  dataSet2: any;
  buildAttributeMap: any;
  materialMap: any;
  charactarMap: any;
  levelMap: any;
  businessMap: any;
  buildNumber: any;
  dataSet5: any;
  person1: any;
  person2: any;
  idList: any;
  // refreshWarnInterval: any;
  // refreshFaultInterval: any;
  idListWarn: any;
  idListFault: any;
  message: any;
  playr: any;
  token: any;
  boxShow = 'none';
  industryCategoryMap: any;
  riskSourceMap: any;

  // isOpenSongAlarm = false;
  // isOpenSongWarn = false;
  mapHeight = '350px';
  timeout: any;
  messageTypeMap: any;
  // FIRE_WARN: '预警',
  // EVENT: '事件',
  // FIRE_ALARM: '告警',
  // DEVICE_FAULT: '故障'
  colorMap: any = {
    FIRE_WARN: 'yellow',
    FIRE_ALARM: 'red',
    DEVICE_FAULT: 'orange'
  };
  offlineChartData: any;
  weather: any;
  roomsNumber: any;
  deviceNum: any;
  alarmAndWarnNum: any;
  user: any;
  person3: any;
  // isOpenSongFault = false;
  centerName = '';
  lastMonthNum: any;
  isUp = true;
  isDeviceUp = false;
  devicelastMonthNum = 0;
  alarmAndWarnLastNum = 0;
  isAlarmUp = false;
  guardDays = 0;
  successCheck = 0;
  successCheckLastMonth = 0;
  isCheckUp = false;
  tebleHeight = '200px';
  rightBoxHeight = '300px';
  rightBoxItemHeight: any;
  resucerChartsInfo = false;

  constructor(
    private apiService: ApiService,
    private enumService: EnumService,
    private events: EventsService,
    private cdr: ChangeDetectorRef,
    private global: Global
  ) {
    this.pageSize = 7;
    this.refreshInterval = null;
    this.dataSet5 = [];
    this.industryCategoryMap = {};
    this.riskSourceMap = {};
    this.message = {
      // accusativeType: 'FIRE_WARN'
    };
    this.idListAll = [];
    this.idList = [];
    this.idListWarn = [];
    this.idListFault = [];
    this.orgId = 7;
    this.checkResultMap = {
      0: '未确认',
      1: '火警',
      2: '误报'
    };

    this.dataSet = [];
    this.teadList = [
      { name: '联网单位' },
      { name: '安装位置' },
      { name: '上报时间' },
      { name: '消息类型' },
      { name: '处理状态' },
      { name: '消防视频' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'place' },
      { type: 'time', name: 'lastReportTime' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'checkRemark' },
      {
        type: 'buttonList',
        buttons: [{ text: '视频', index: 1 }]
      }
    ];
    this.messageStatusMap = {};
    this.operationMap = {};
    this.orgInfo = {};

    this.hanlder = (...args: any[]) => {
      this.onContentChange(args[0]);
    };
    this.events.on(SocketHandler.MESSAGE_TYPE.Message, this.hanlder);
    this.mapOptions = {
      zoom: this.scale
    };
    this.lng = 120.133718;
    this.lat = 30.261314;
    this.map = undefined;
    this.placeInfo = {};
    this.locationCache = [0, 0];
    this.messageTypeMap = {
      FIRE_WARN: '预警',
      EVENT: '事件',
      FIRE_ALARM: '告警',
      DEVICE_FAULT: '故障'
    };
  }

  getTrClass(item: any, index: number) {
    if (index == 0) {
      console.log(item);
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.stopSong();
    this.playr = null;
    this.events.destroyListener(SocketHandler.MESSAGE_TYPE.Message, this.hanlder);
  }

  // 登录时间
  getAccountList3(data: any) {
    this.apiService.getAccountList3(data).then(res => {
      if (res && res.data) {
        console.log('单位登录的人');
        console.log(res);
      }
    });
  }

  ngAfterViewInit() {
    this.mapHeight = (document.documentElement.clientHeight - (70 + 88)) / 2 + 'px';
    this.tebleHeight = (document.documentElement.clientHeight - (70 + 88 + 20)) / 2 + 'px';
    this.rightBoxHeight = document.documentElement.clientHeight - 70 - 35 + 'px';
    this.rightBoxItemHeight = (document.documentElement.clientHeight - 70 - 35) / 4 + 'px';
    this.cdr.detectChanges();
    switch (this.global.getUserInfo().category) {
      case 'OP':
        this.apiService.getOperationById(this.global.getUserInfo().operateId).then(res => {
          if (res && res.data) {
            this.guardDays = Math.ceil((new Date().getTime() - res.data.createTime) / 86400000);
            this.centerName = '消易云消防数字化SaaS服务平台——[' + res.data.name + ']';
            console.log(res.data);
            this.lng = res.data.longitude ? res.data.longitude : this.lng;
            this.lat = res.data.latitude ? res.data.latitude : this.lat;
            this.initMap([this.lng, this.lat]);
            //救援力量
            this.getResucerCharts({ operateId: res.data.id });
            if (res.data.provinceId && res.data.cityId && res.data.districtId) {
              let district = this.enumService.getDistrict(res.data.provinceId, res.data.cityId, res.data.districtId).name;
              let area = { name: district, color: '#ccc' };
              this.setMapArea(area.name, area.color);
            } else {
              let area = { name: '西湖区', color: '#ccc' };
              this.setMapArea(area.name, area.color);
            }
            let createTimeStart = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
            let createTimeEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
            this.getAccountList3({
              operateId: res.data.id,
              size: 10,
              page: 0,
              createTimeStart: createTimeStart,
              createTimeEnd: createTimeEnd
            });
          } else {
            this.centerName = '消易云消防数字化SaaS服务平台';
          }
        });
        break;
      case 'ORG':
        this.apiService.findOrgById(this.global.getUserInfo().orgId).then(res => {
          if (res && res.data) {
            let createTimeStart = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
            let createTimeEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
            this.getAccountList3({
              operateId: res.data.id,
              size: 10,
              page: 0,
              createTimeStart: createTimeStart,
              createTimeEnd: createTimeEnd
            });
            this.getResucerCharts({ operateId: res.data.operateId });
            this.centerName = '消易云消防数字化SaaS服务平台——[' + this.global.getUserInfo().orgName + ']';
            this.lng = res.data.longitude ? res.data.longitude : this.lng;
            this.lat = res.data.latitude ? res.data.latitude : this.lat;
            this.initMap([this.lng, this.lat]);
            if (res.data.provinceId && res.data.cityId && res.data.districtId) {
              let district = this.enumService.getDistrict(res.data.provinceId, res.data.cityId, res.data.districtId).name;
              let area = { name: district, color: '#ccc' };
              this.setMapArea(area.name, area.color);
            } else {
              let area = { name: '西湖区', color: '#ccc' };
              this.setMapArea(area.name, area.color);
            }
            this.guardDays = Math.ceil((new Date().getTime() - res.data.createTime) / 86400000);
          }
        });
        break;
    }
  }

  private initMap(locations: [number, number]) {
    this.position = new window['AMap'].LngLat(this.lng, this.lat);
    this.locationCache = locations;
    this.mapOptions.center = locations;
    this.locationChange(this.lng, this.lat);
    this.mapOptions.zoom = 12;
    this.map = new AMap.Map(this.containerId, this.mapOptions);
    this.map.setMapStyle('amap://styles/whitesmoke');
    //TODO 动态设置区域
    this.rescuePointGetList();
  }

  setMapArea(name: string, color: string) {
    // let map = this.$refs.myMap.$map;
    let district = null;
    let polygons: any[] = [];
    //加载行政区划插件
    if (!district) {
      //实例化DistrictSearch
      let opts = {
        subdistrict: 0, //获取边界不需要返回下级行政区
        extensions: 'all', //返回行政区边界坐标组等具体信息
        level: 'district' //查询行政级别为 市
      };
      district = new AMap.DistrictSearch(opts);
    }
    console.log(district);
    //行政区查询
    district.setLevel('district');
    district.search(name, (status: any, result: any) => {
      this.map.remove(polygons); //清除上次结果
      polygons = [];
      var bounds = result.districtList[0].boundaries;
      if (bounds) {
        for (var i = 0, l = bounds.length; i < l; i++) {
          //生成行政区划polygon
          var polygon = new AMap.Polygon({
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.4,
            fillColor: color,
            strokeColor: '#0091ea'
          });
          polygons.push(polygon);
        }
      }
      this.map.add(polygons);
      // map.setFitView(polygons);//视口自适应
    });
  }

  clearMarker() {
    if (this.marker) {
      this.map.remove(this.marker);
    }
  }

  locationChange(lng: number, lat: number) {
    // this.locationService.regeo(lng, lat).then((response: any) => {
    // });
  }

  // public static final int UNKNOWN = 0;
  // public static final int ONLINE = 10;
  // public static final int OFFLINE = 20;
  // public static final int FIRE_ALARM = 30;
  // public static final int FIRE_ALARM_CLEAR = 31;
  // public static final int FIRE_WARN = 40;
  // public static final int FIRE_WARN_CLEAR = 41;
  // public static final int FAULT = 50;
  // public static final int FAULT_CLEAR = 51;
  // public static final int EVENT = 60;

  onContentChange(content: any) {
    console.log(content);
    this.orgId = content.data.orgId;
    if (content.id) {
      this.idListAll.push(content);
    }
    console.log(this.idListAll);
    this.playSong(content.id);
    this.setMarker(content.id);
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      closed: false
    };
    // 告警开始
    // TODO 改成switch case

    if (this.orgId) {
      this.getOrgInfo();
    }
  }

  playSong(type: 'FIRE_ALARM' | 'FIRE_WARN' | 'DEVICE_FAULT') {
    if (type !== this.audioType) {
      if (!!this.audio) {
        try {
          this.audio.stop();
        } catch (e) {
          console.log('暂停音乐出错了');
        } finally {
          this.audio = undefined;
        }
      }
      let title = this.messageTypeMap[type];
      let file = '';
      let cssClass = '';

      switch (type) {
        case 'FIRE_WARN':
          file = './assets/warn.mp3';
          cssClass = 'alert-warning';
          break;
        case 'FIRE_ALARM':
          file = './assets/alarm.mp3';
          cssClass = 'alert-danger';
          break;
        case 'DEVICE_FAULT':
          file = './assets/fault.mp3';
          cssClass = 'alert-secondary';
          break;
      }
      this.audio = Audio({
        file,
        loop: true,
        volume: 1,
        autoPlay: true
      });
      this.audioType = type;
      try {
        this.audio.play();
      } catch (e) {}
    }
  }

  stopSong() {
    this.audioType = '';
    if (!!this.audio) {
      try {
        this.audio.stop();
      } catch (e) {
        console.log('暂停音乐出错了');
      }
    }
  }

  async setMarker(type?: 'FIRE_ALARM' | 'FIRE_WARN' | 'DEVICE_FAULT') {
    this.clearMarker();
    this.isYellow = false;
    this.isRed = false;
    this.isOrange = false;
    let src = 'assets/marker.jpg';
    switch (type) {
      case 'FIRE_WARN':
        src = 'assets/yellow.png';
        this.isYellow = true;
        break;
      case 'FIRE_ALARM':
        src = 'assets/red.png';
        this.isRed = true;
        break;
      case 'DEVICE_FAULT':
        src = 'assets/orange.png';
        this.isOrange = true;
        break;
    }
    let markerContent = `<div class='img-box'>
      <img src='${src}' id='animat' style='width:60px;position:relative;animation:mymove 5s infinite;-webkit-animation:mymove 5s infinite; animation-direction:alternate;animation-timing-function: ease-in-out;-webkit-animation:mymove 5s infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function: ease-in-out;'/> </div>`;
    this.marker = new AMap.Marker({
      position: this.locationCache,
      content: markerContent,
      offset: new AMap.Pixel(-12, -12)
    });

    let res = await this.apiService.orgContactInfo({ orgId: this.orgId });
    let personList = res.data;
    this.person1 = personList[0];
    this.person2 = personList[1];
    // this.person3 = personList[2];

    let rs = await this.apiService.findOrgById(this.orgId);
    this.orgInfo = rs.data;
    let infoWindow = new AMap.InfoWindow({
      // isCustom: true //使用自定义窗体
      offset: new AMap.Pixel(15, -10) //窗体偏移位置
    });
    this.marker.on('mouseover', (e: any) => {
      let content = `<div class="rescuer" style="width:360px">
            <div class='title'>
              <img width="35px"  src='${src}'/>
              <span style="font-size:18px;font-weight: bold">
              ${this.orgInfo.orgName}
                <span style="font-size:12px;font-weight:100">(联网单位)</span>
              </span>
            <div>
            <div style="padding:0px 0px 0px 35px;">
              <p class='input-item' style="margin:5px;font-weight: bold">${this.messageText}内容: 设备${
        this.dataSet[0] ? this.dataSet[0].type : '-'
      } 上报:${this.dataSet[0].name} </p>
              <p class='input-item' style="margin:5px">上报时间: ${this.dateFormat(
                'mm-dd HH:MM:SS',
                this.dataSet[0] ? this.dataSet[0].lastReportTime : ''
              )} 位置: <span style="display: inline-block;
              width: 100px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;">${this.dataSet[0] ? this.dataSet[0].place : '-'}</span></p>
              <p class='input-item' style="margin:5px">紧急联系人: ${this.person1.name + this.person1.phone}</p>
              <p class='input-item' style="margin:5px">公司电话: ${this.orgInfo.tel}</p>
              <p class='input-item' style="margin:5px">地 址  :${this.orgInfo.address}</p>
            </div>
        </div>`;
      // 设置信息框内容
      infoWindow.setContent(content);
      //将marker放到指定坐标
      infoWindow.open(this.map, this.marker.getPosition());
    });
    let content = `<div class="rescuer" style="width:360px">
            <div class='title'>
              <img width="35px"  src='${src}'/>
              <span style="font-size:18px;font-weight: bold">
              ${this.orgInfo.orgName}
                <span style="font-size:12px;font-weight:100">(联网单位)</span>
              </span>
            <div>
            <div style="padding:0px 0px 0px 35px;">
            <p class='input-item' style="margin:5px;font-weight: bold">${this.messageText}内容: 设备-${
      this.dataSet[0] ? this.dataSet[0].type : '-'
    } 原因:${this.dataSet[0] ? this.dataSet[0].name : '-'}</p>
            <p class='input-item' style="margin:5px">上报时间:${this.dateFormat(
              'mm-dd HH:MM:SS',
              this.dataSet[0] ? this.dataSet[0].lastReportTime : ''
            )} 位置: <span style="display: inline-block;
            width: 100px;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            top: 5px;
            text-overflow: ellipsis;">${this.dataSet[0] ? this.dataSet[0].place : '-'}</span></p>
              <p class='input-item' style="margin:5px">紧急联系人: ${this.person1.name + this.person1.phone}</p>
              <p class='input-item' style="margin:5px">公司电话: ${this.orgInfo.tel}</p>
              <p class='input-item' style="margin:5px">地 址  :${this.orgInfo.address}</p>
            </div>
        </div>`;
    // 设置信息框内容
    infoWindow.setContent(content);
    //将marker放到指定坐标
    infoWindow.open(this.map, this.marker.getPosition());
    // 将 markers 添加到地图
    this.map.add(this.marker);
  }

  yinshiyunGetToken() {
    this.apiService.yinshiyunGetToken().then(response => {
      if (response && response.data) {
        this.token = response.data;
        if (!this.playr) {
          this.createPlayer();
        }
      }
    });
  }
  // 风险管理
  getOrgRiskSource() {
    this.apiService.getRiskSourceAll().then(response => {
      if (response && response.data) {
        response.data.forEach((item: any) => {
          this.riskSourceMap[item.id] = item.name;
        });
        this.apiService.getOrgRiskSource(this.orgId).then(response => {
          if (response && response.data) {
            response.data.forEach((element: any, index: number) => {
              element.index = index;
              element.nameText = this.riskSourceMap[element.riskSourceId];
            });
            this.dataSet5 = response.data;
          }
        });
      }
    });
  }
  dateFormat(fmt: any, time: any) {
    if (time) {
      let date = new Date(time);
      let ret;
      const opt: any = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
        }
      }
      return fmt;
    }
    {
      return '-';
    }
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
        this.charactarMap = this.enumService.getMap(response.data);
      }
    });
  }
  // dataV右侧统计
  datevRoomsNum() {
    this.apiService.datevRoomsNum().then(response => {
      console.log(response);
      if (response && response.data) {
        this.roomsNumber = response.data[0].count;
        if (response.data[1].count > 0) {
          this.isUp = true;
          this.lastMonthNum = response.data[1].count / 10;
        } else {
          this.isUp = false;
          this.lastMonthNum = Math.abs(Number(response.data[1].count)) / 10;
        }
      } else {
        this.roomsNumber = 0;
        this.lastMonthNum = 0;
      }
    });
  }
  // 救援力量
  getResucerCharts(data: any) {
    this.apiService.getResucerCharts(data).then(response => {
      console.log(response);
      let app: any = {};
      type EChartsOption = echarts.EChartsOption;
      let chartDom = document.getElementById('rescuerCharts')!;
      let myChart = echarts.init(chartDom);
      let option: EChartsOption;
      let list1: any[] = []; //专业消防救援队
      let list2: any[] = []; //其他救援力量
      let list3: any[] = []; //单位微型消防站
      let list4: any[] = []; //派出所
      let list5: any[] = []; //社区微型消防站
      let nameList: any[] = [];
      if (response && response.data && response.data.length != 0) {
        response.data.forEach((element: any, index: number) => {
          if (!(index > 5) && index <= response.data.length) {
            nameList.push(element.name);
            if (response.data.length) {
              list1.push(element.list[0].count);
              list2.push(element.list[1] ? element.list[1].count : 0);
              list3.push(element.list[2] ? element.list[2].count : 0);
              list4.push(element.list[3] ? element.list[3].count : 0);
              list5.push(element.list[4] ? element.list[4].count : 0);
            }
          }
        });
        const posList = [
          'left',
          'right',
          'top',
          'bottom',
          'inside',
          'insideTop',
          'insideLeft',
          'insideRight',
          'insideBottom',
          'insideTopLeft',
          'insideTopRight',
          'insideBottomLeft',
          'insideBottomRight'
        ] as const;

        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {} as Record<string, string>)
          },
          distance: {
            min: 0,
            max: 100
          }
        };

        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            const labelOption: BarLabelOption = {
              rotate: app.config.rotate as BarLabelOption['rotate'],
              align: app.config.align as BarLabelOption['align'],
              verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
              position: app.config.position as BarLabelOption['position'],
              distance: app.config.distance as BarLabelOption['distance']
            };
            myChart.setOption<echarts.EChartsOption>({
              series: [
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                }
              ]
            });
          }
        };

        type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

        const labelOption: BarLabelOption = {
          show: false,
          position: app.config.position as BarLabelOption['position'],
          distance: app.config.distance as BarLabelOption['distance'],
          align: app.config.align as BarLabelOption['align'],
          verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
          rotate: app.config.rotate as BarLabelOption['rotate'],
          // formatter: '{c}  {name|{a}}',
          fontSize: 12,
          rich: {
            name: {}
          }
        };

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['社区微型消防站', '单位微型消防站', '专业消防救援队', '派出所', '其他救援力量']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: nameList
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '社区微型消防站',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: list5
            },
            {
              name: '单位微型消防站',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: list3
            },
            {
              name: '专业消防救援队',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: list1
            },
            {
              name: '派出所',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: list4
            },
            {
              name: '其他救援力量',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: list2
            }
          ]
        };
        option && myChart.setOption(option);
      } else {
      }
    });
  }

  // 火情分布
  datevEventGroupByHour(operateId: number) {
    this.apiService.datevEventGroupByHour({ operateId: operateId }).then(response => {
      if (response && response.data) {
        console.log(response);
        var chartDom = document.getElementById('timeDistribution')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;

        let list1: any = []; //预警
        let list2: any = []; //告警
        let list3: any = []; //成灾

        response.data.forEach((element: any, index: number) => {
          list1.push(element.list[0].count);
          list2.push(element.list[1].count);
          list3.push(element.list[2].count);
        });

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['00:00-04:00', '05:00-08:00', '08:00-11:00', '11:00-13:00', '13:00-16:00', '16:00-19:00', '19:00-23:59']
          },
          series: [
            {
              itemStyle: {
                color: '#FFC409'
              },
              name: '预警(条)',
              type: 'bar',
              stack: 'total',
              label: {
                // show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: list1
            },
            {
              itemStyle: {
                color: '#EB445A'
              },
              name: '告警(条)',
              type: 'bar',
              stack: 'total',
              label: {
                // show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: list2
            },
            {
              itemStyle: {
                color: 'rgb(177, 2, 2)'
              },
              name: '成灾(条)',
              type: 'bar',
              stack: 'total',
              label: {
                // show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: list3
            }
          ]
        };
        option && myChart.setOption(option);
      }
    });
  }
  // 火情高发业态
  datevEventGroupByIndustryCategory() {
    this.apiService.datevEventGroupByIndustryCategory().then(response => {
      console.log('datevEventGroupByIndustryCategory');
      console.log(response);
      if (response && response.data) {
        let list1: any[] = []; //告警
        let list2: any[] = []; //预警
        let listName: { name: any; max: number }[] = [];
        response.data[0].list.forEach((element: any) => {
          listName.push({ name: element.name, max: 500 });
          list1.push(element.count);
        });

        response.data[1].list.forEach((element: any) => {
          list2.push(element.count);
        });

        const lineStyle = {
          width: 1,
          opacity: 0.5
        };
        let chartDom = document.getElementById('formatDistribution')!;
        let myChart = echarts.init(chartDom);
        let option: EChartsOption;
        option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            data: ['']
          },
          radar: {
            shape: 'circle',
            indicator: listName,
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0 )'
              }
            }
          },
          series: [
            {
              type: 'radar',
              name: '预警,告警',
              data: [
                {
                  value: list2,
                  name: '预警(条)',
                  itemStyle: {
                    color: '#FFC409'
                  }
                },
                {
                  value: list1,
                  name: '告警(条)',
                  itemStyle: {
                    color: '#EB445A'
                  }
                }
              ]
            }
          ]
        };

        option && myChart.setOption(option);
      }
    });
  }
  // 安全态势图
  datevEventCurveForHome(operateId: any) {
    this.apiService.datevEventCurveForHome({ operateId: operateId }).then(response => {
      if (response && response.data) {
      }
    });
  }

  datevEventCheckResult() {
    this.apiService.datevEventCheckResult().then(response => {
      if (response && response.data) {
        this.successCheck = response.data[0].count;
        if (response.data[1] && response.data[1].count > 0) {
          this.isCheckUp = true;
          this.successCheckLastMonth = response.data[1].count / 10;
        } else {
          this.isCheckUp = false;
          this.successCheckLastMonth = Math.abs(Number(response.data[1].count)) / 10;
        }
      } else {
        this.successCheckLastMonth = 0;
        this.successCheck = 0;
      }
    });
  }

  // 总预警条数
  datevAlarmAndWarnNum(operateId: any) {
    this.apiService.datevAlarmAndWarnNum({ operateId: operateId }).then(response => {
      if (response && response.data) {
        this.alarmAndWarnNum = response.data[0].count;
        if (response.data[1].count > 0) {
          this.isAlarmUp = true;
          this.alarmAndWarnLastNum = response.data[1].count / 10;
        } else {
          this.isAlarmUp = false;
          this.alarmAndWarnLastNum = Math.abs(Number(response.data[1].count)) / 10;
        }
      } else {
        this.alarmAndWarnNum = 0;
        this.alarmAndWarnLastNum = 0;
      }
    });
  }
  // 探测器数量
  datevDeviceNum() {
    this.apiService.datevDeviceNum().then(response => {
      if (response && response.data) {
        this.deviceNum = response.data[0].count;
        if (response.data[1].count > 0) {
          this.isDeviceUp = true;
          this.deviceNum = response.data[1].count / 10;
        } else {
          this.isDeviceUp = false;
          this.devicelastMonthNum = Math.abs(Number(response.data[1].count)) / 10;
        }
      } else {
        this.deviceNum = 0;
        this.devicelastMonthNum = 0;
      }
    });
  }

  // 后台首页警情趋势（按天）
  webEventCurveForHome() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const yet = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    this.apiService
      .webEventCurveForHome({
        firstReportTimeStart: yet.getTime(),
        firstReportTimeEnd: now.getTime() + 24 * 3600 * 1000
      })
      .then(response => {
        console.log(response);
        if (response && response.data && response.data.length == 2) {
          let alarmList: any[] = [];
          let warnList: any[] = [];
          let dateList: any = [];
          response.data[0].list.forEach((element: any) => {
            alarmList.push(element.count);
            dateList.push(element.name);
          });
          response.data[1].list.forEach((element: any) => {
            warnList.push(element.count);
          });
          type EChartsOption = echarts.EChartsOption;
          var chartDom = document.getElementById('offlineChartData')!;
          var myChart = echarts.init(chartDom);
          var option: EChartsOption;
          option = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['预警', '告警']
            },
            toolbox: {
              show: false,
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: dateList
              }
            ],
            yAxis: [
              {
                name: '条',
                type: 'value'
              }
            ],
            series: [
              {
                smooth: true,
                name: '预警',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: alarmList,
                itemStyle: {
                  color: '#FFC409'
                }
              },
              {
                smooth: true,
                name: '告警',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: warnList,
                itemStyle: {
                  color: '#EB445A'
                }
              }
            ]
          };

          option && myChart.setOption(option);
        }
      });
  }

  rescuePointGetList() {
    let operateId = this.global.getUserInfo().operateId ? this.global.getUserInfo().operateId : 4;
    this.apiService.rescuePointGetList({ operateId: operateId }).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.SSQ = this.enumService.getSSQ(element.provinceId, element.cityId, element.districtId);
          this.setRescuerPoint(element);
          // 将 markers 添加到地图
        });
      } else {
        // this.dataSet = [];
        // this.total = 0; //总条数
      }
    });
  }

  setRescuerPoint(item: any) {
    let src = 'assets/maker1.png';
    switch (item.type) {
      case '社区微型消防站':
        src = 'assets/maker3.png';
        break;
      case '单位微型消防站':
        src = 'assets/maker5.png';
        break;
      case '专业消防救援队':
        src = 'assets/maker1.png';
        break;
      case '派出所':
        src = 'assets/maker2.png';
        break;
      case '其他救援力量':
        src = 'assets/maker4.png';
        break;
    }
    let markerContent = `<div class='img-box'>
        <img src='${src}' id='animat' style='width:40px;position:relative;'/>
      </div>`;
    let marker = new AMap.Marker({
      position: [item.longitude, item.latitude],
      content: markerContent,
      offset: new AMap.Pixel(-20, -20)
    });

    let infoWindow = new AMap.InfoWindow({
      // isCustom: true //使用自定义窗体
      offset: new AMap.Pixel(0, -20) //窗体偏移位置
    });
    marker.on('mouseover', (e: any) => {
      let content = `<div class="rescuer" style="width:360px">
            <div class='title'>
              <img width="35px"  src='${src}'/>
              <span style="font-size:18px;font-weight: bold">
              ${item.name}
                <span style="font-size:12px;font-weight:100">(${item.type})</span>
              </span>
            <div>
            <div style="padding:0px 0px 0px 35px;">
              <p class='input-item' style="margin:5px">联系人: ${item.contactName}</p>
              <p class='input-item' style="margin:5px">手机号: ${item.phone}</p>
              <p class='input-item' style="margin:5px">电 话  : ${item.tel}</p>
              <p class='input-item' style="margin:5px">地 址  :${item.SSQ + item.address}</p>
            </div>
        </div>`;
      // 设置信息框内容
      infoWindow.setContent(content);
      //将marker放到指定坐标
      infoWindow.open(this.map, marker.getPosition());
    });
    this.map.add(marker);
  }

  getWeather() {
    AMap.plugin('AMap.Weather', () => {
      let weather = new AMap.Weather();
      //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
      weather.getForecast('330100', (err: any, data: any) => {
        console.log(data.forecasts[0]);
        if (data && data.forecasts[0]) {
          this.weather = data.forecasts[0];
        } else {
          this.weather = null;
        }
      });
    });
  }

  ngOnInit(): void {
    this.user = this.global.getUserInfo();
    let operateId = this.global.getUserInfo().operateId ? this.global.getUserInfo().operateId : 4;
    this.getWeather();
    // 根据运营中心id去取点
    this.webEventCurveForHome();
    // 获取统计数据
    // this.getResucerCharts(); //救援力量
    this.datevRoomsNum();
    this.datevDeviceNum();
    this.datevEventCheckResult(); //早期成功处置
    this.datevAlarmAndWarnNum(operateId);
    this.datevEventCurveForHome(operateId);
    this.datevEventGroupByIndustryCategory();
    this.datevEventGroupByHour(operateId);
    // 测试单位信息
    this.getOperationList();
    this.yinshiyunGetToken();
    this.charactarSearch();
    this.businessMap = this.enumService.businessMap;
    this.materialMap = this.enumService.materialMap;
    // this.buildAttributeMap = this.enumService.buildAttributeMap;
    this.interval = setInterval(() => {
      this.time = Date.now();
    }, 1000);
    this.userTypeMap = this.enumService.userTypeMap;
    this.messageStatusMap = this.enumService.messageStatausMap;
    this.search({
      page: this.pageIndex - 1,
      size: 7,
      closed: false
    });
  }

  searchLevel() {
    this.apiService.searchLevel().then(response => {
      if (response && response.data) {
        this.levelMap = this.enumService.getMap(response.data);
      }
    });
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationMap = this.enumService.getMap(response.data);
      }
    });
  }

  // 建筑类型
  orgBuildTypeFindAll() {
    this.apiService.orgBuildTypeFindAll().then(response => {
      if (response && response.data) {
        console.log(response);
        // this.buildAttributeArr = response.data;
        this.buildAttributeMap = this.enumService.getMap(response.data);
      }
    });
  }

  search(data: any) {
    data = this.apiService.filterData(data);
    Promise.all([this.apiService.searchFireAlarm(data), this.apiService.searchFireWarn(data), this.apiService.searchDeviceFault(data)])
      .then(responses => {
        if (responses[0] && responses[1] && responses[2] && responses[0].data && responses[1].data && responses[2].data)
          if (
            responses[0].data.content &&
            responses[0].data.content.length === 0 &&
            responses[1].data.content &&
            responses[1].data.content.length === 0 &&
            responses[2].data.content &&
            responses[2].data.content.length === 0
          ) {
            // TODO:
            this.stopSong();
          } else {
            const cache = responses[0].data.content.concat(responses[1].data.content).concat(responses[2].data.content);
            const arr = cache.sort((a: any, b: any) => b.lastReportTime - a.lastReportTime);
            let list = arr.filter((item: any) => {
              return item.accusativeType == this.message.accusativeType;
            });
            this.message = list[0];
            if (!this.message.accusativeType) {
              this.message.accusativeType  ='DEVICE_FAULT'
            }
            this.messageText = this.messageTypeMap[this.message.accusativeType];
            list.forEach((element: any, index: any) => {
              element.index = index;
              element.messageType = this.messageTypeMap[element.accusativeType] ? this.messageTypeMap[element.accusativeType] : '';
              element.checkResultText = this.checkResultMap[element.checkResult];
              element.parameter = '查看数据';
              element.abbreviation = this.enumService.getSerialNumAbbreviation(element.serialNum);
              if (element.subjectType == 'SYSTEM') {
                element.subjectName = '系统';
                element.checkRemark = element.content;
              }
              if (!element.place) {
                element.place = '无';
              }
            });
            this.dataSet = list.slice(0, 6);
            this.playSong(this.message.accusativeType);
            this.setMarker(this.message.accusativeType);
          }
      })
      .finally(() => {
        this.timeout = setTimeout(() => {
          this.search(data);
        }, 3000);
      });
  }

  getOrgInfo() {
    this.apiService.findOrgById(this.orgId).then(response => {
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

        this.orgInfo.businessStatus = this.businessMap[this.orgInfo.businessStatus];

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
        // this.historyData = {
        //   closed: true
        // };
        // 获取单位紧紧联系人
        this.orgContactInfo();
        // //历史记录
        // this.processLogSearch();
        // // 单位建筑
        // this.orgBuildInfo();
        // this.getOrgRiskSource();
      }
    });
  }

  orgContactInfo() {
    //获取紧急联系人
    this.apiService.orgContactInfo({ orgId: this.orgId }).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.levelText = this.levelMap[element.level];
          element.charactarText = this.charactarMap[element.charactarId];
        });
        this.dataSet7 = response.data;
        this.person1 = this.dataSet7[0];
        this.person2 = this.dataSet7[1];
        this.person3 = this.dataSet7[2];
      }
    });
  }

  orgBuildInfo() {
    this.apiService.orgBuildInfo(this.orgId).then(response => {
      if (response && response.data) {
        let rooms = 0;
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.buildAttributeText = this.buildAttributeMap[element.buildAttribute];
          element.materialText = this.materialMap[element.material];
          rooms += element.roomsNumber;
        });
        this.rooms = rooms;
        this.dataSet2 = response.data;
        this.buildNumber = response.data ? response.data.length : 0;
      }
    });
  }

  // processLogSearch() {
  //   if (this.messageTypeId == 1) {
  //     this.accusativeType = 'FIRE_WARN';
  //   } else if (this.messageTypeId == 0) {
  //     this.accusativeType = 'FIRE_ALARM';
  //   } else {
  //     this.accusativeType = 'FIRE_FAULT';
  //   }
  //   this.apiService
  //     .processLogSearch({
  //       accusativeId: this.editItem.id,
  //       accusativeType: this.accusativeType,
  //       page: this.pageIndexHistory - 1,
  //       size: 10
  //     })
  //     .then(response => {
  //       console.log(response);
  //       if (response && response.data) {
  //         response.data.content.forEach((element: any, index: any) => {
  //           element.index = index;
  //           element.userTypeText = this.userTypeMap[element.accusativeType];
  //           element.processTypeText = this.messageStatusMap[element.processType];

  //           if (element.subjectType == 'SYSTEM') {
  //             element.subjectName = '系统';
  //             element.checkRemark = element.content;
  //           }
  //         });
  //         this.dataSetHistory = response.data.content;
  //         this.totalHistory = response.data.totalElements; //总条数
  //       } else {
  //         this.dataSetHistory = [];
  //         this.totalHistory = 0; //总条数
  //       }
  //     });
  // }

  back() {
    history.back();
  }

  editFun(item: any) {}

  turnPageHistory(page: number) {
    this.pageIndexHistory = page;
    // this.processLogSearch();
  }

  mouseEnter(event: any) {}

  mouseLeave(event: any) {}

  Cancel() {
    this.isVisible = false;
  }

  showVideo() {
    // this.isVisible = true;
    this.boxShow = 'block';
    // this.createPlayer();
  }

  closeVideo() {
    this.boxShow = 'none';
  }

  createPlayer() {
    this.playr = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken: this.token,
      url: 'ezopen://open.ys7.com/C50669725/1.hd.live',
      template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      autoplay: true,
      // 视频上方头部控件
      header: ['capturePicture', 'save', 'zoom'], // 如果templete参数不为simple,该字段将被覆盖
      // 视频下方底部控件
      footer: ['talk', 'broadcast', 'hd', 'fullScreen'], // 如果template参数不为simple,该字段将被覆盖
      audio: 0, // 是否默认开启声音 0 - 关闭 1 - 开启
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

  Ok() {}
}
