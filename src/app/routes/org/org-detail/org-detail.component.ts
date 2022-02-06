import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabsCanDeactivateFn } from 'ng-zorro-antd/tabs';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';
import { NzImageModule } from 'ng-zorro-antd/image';

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
  Autocomplete: any;
  PlaceSearch: any;
  Geocoder: any;
  event: any;
};

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.css']
})
export class OrgDetailComponent implements OnInit {
  public url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

  public tabs = [
    { name: '基本信息', temp: 1 },
    { name: '建筑信息', temp: 2 },
    { name: '建筑图纸', temp: 3 },
    { name: '商务合同', temp: 4 },
    { name: '风险源', temp: 5 },
    { name: '消防设施', temp: 6 },
    { name: '紧急联系人', temp: 7 },
    { name: '单位账号', temp: 8 }
  ];
  public planeAddEditTittle = '';
  public rootOrgId: any;
  public parentOrgId: any;
  public level: any;
  public orgSerial: any;
  public logo: any;
  public orgShortName: any;
  public orgName: any;
  public tel: any;
  public longitude: any;
  public latitude: any;
  public provinceId: any;
  public cityId: any;
  public districtId: any;
  public address: any;
  public images: any;
  public operateId: any;
  public ownershipType: any;
  public industry: any;
  public industryCategory: any;
  public businessStatus: any;
  public certSerial: any;
  public orgTel: any;
  public legalPerson: any; //法人
  public orgTypeArr: any;
  public industryArr: any;
  public orgType: any;
  industryCategoryArr: any;
  form!: FormGroup;
  submitting = false;
  data: any;
  orgId: any;
  orgInfo: any;
  operationList: any;
  serveStartTime: any;
  serveEndTime: any;
  date: any;
  businessArr: any;
  needHead = true;

  // 风险源
  riskSourceAll: any;
  total5 = 0;
  pageIndex5 = 0;
  pageSize5 = 10;
  dataSet5 = [];
  keyNameList5 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'nameText' },
    { type: 'text', name: 'position' },
    { type: 'text', name: 'count' },
    { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
  ];
  teadList5 = [
    { name: '序号', type: 'index' },
    { name: '风险源名称' },
    { name: '风险源位置' },
    { name: '风险源数量' },
    // { name: "风险源图片" },
    { name: '操作' }
  ];
  // 设备设施
  total6 = 0;
  pageIndex6 = 0;
  pageSize6 = 10;
  dataSet6 = [];
  isVisible6: any;
  riskSource: any;
  isVisible5 = false;
  fileList: any;
  keyNameList6 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'name' },
    { type: 'text', name: 'unit' },
    { type: 'text', name: 'count' },
    {
      type: 'buttonList',
      buttons: [
        { text: '编辑', index: 1 },
        { text: '删除', index: 2 }
      ]
    }
  ];
  teadList6 = [{ name: '序号', type: 'index' }, { name: '名称' }, { name: '单位' }, { name: '数量' }, { name: '操作' }];

  //   建筑信息
  total2 = 0;
  pageIndex2 = 0;
  pageSize2 = 10;

  keyNameList2 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'name' },
    { type: 'text', name: 'floor' },
    { type: 'text', name: 'roomsNumber' },
    { type: 'text', name: 'square' },
    { type: 'text', name: 'materialText' },
    { type: 'text', name: 'buildAttributeText' },
    { type: 'imgList', name: 'images' },
    // { type: 'imgList', name: 'blueprint' },
    { type: 'imgList', name: 'evacuationImages' },
    { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
  ];
  teadList2 = [
    { name: '序号', type: 'index' },
    { name: '建筑名称' },
    { name: '楼层数' },
    { name: '房间数' },
    { name: '面价(平方米)' },
    { name: '结构类型' },
    { name: '属性' },
    { name: '外观照' },
    // { name: '平面图' },
    { name: '疏散图' },
    { name: '操作' }
  ];

  // 建筑图纸
  total3 = 0;
  pageIndex3 = 1;
  pageSize3 = 10;
  keyNameList3 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'name' },
    { type: 'text', name: 'floor' },
    // { type: 'text', name: 'roomsNumber' },
    // { type: 'text', name: 'square' },
    // { type: 'text', name: 'materialText' },
    // { type: 'text', name: 'buildAttributeText' },
    { type: 'imgList', name: 'blueprint' }
    // { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
  ];
  teadList3 = [
    { name: '序号', type: 'index' },
    { name: '建筑名称' },
    { name: '楼层数' },
    // { name: '房间数' },
    // { name: '面价(平方米)' },
    // { name: '结构类型' },
    // { name: '属性' },
    { name: '平面图' }
  ];
  // 账户列表
  // riskSourceAll:any
  total8 = 0;
  pageIndex8 = 0;
  pageSize8 = 10;
  dataSet8: any;
  isVisible8 = false;

  keyNameList8 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'charactarText' },
    { type: 'text', name: 'name' },
    { type: 'text', name: 'phone' },
    { type: 'time', name: 'createTime' },
    { type: 'text', name: 'position' },
    {
      type: 'buttonList',
      buttons: [{ text: '编辑', index: 1 }]
    }
  ];
  teadList8 = [
    { name: '序号', type: 'index' },
    { name: '账号类型' },
    { name: '姓名' },
    { name: '手机号' },
    { name: '创建时间' },
    { name: '职务' },
    { name: '操作' }
  ];
  riskSourceMap: any;
  account: any;
  charactarList: any;
  charactarMap: any;

  total7 = 0;
  pageIndex7 = 0;
  pageSize7 = 10;
  isVisible7 = false;
  dataSet7 = [];

  keyNameList7 = [
    { type: 'index', name: 'index' },
    { type: 'text', name: 'levelText' },
    { type: 'text', name: 'name' },
    { type: 'text', name: 'phone' },
    // { type: 'time', name: 'createTime' },
    { type: 'text', name: 'position' },
    {
      type: 'buttonList',
      buttons: [
        { text: '编辑', index: 1 },
        { text: '删除', index: 2 }
      ]
    }
  ];
  teadList7 = [
    { name: '序号', type: 'index' },
    { name: '通知等级' },
    { name: '姓名' },
    { name: '手机号' },
    // { name: '持证档案' },
    { name: '职务' },
    { name: '操作' }
  ];
  levelList: any;
  emergencyContact: any;
  levelMap: any;
  teadList4: any;
  keyNameList4: any;
  dataSet4: any;
  total4 = 0;
  pageIndex4 = 0;
  pageSize4 = 10;
  dataSet2: any;
  isVisible2 = false;
  bulid: any;
  buildAttributeArr: any;
  orgLogo: any;
  isEdit: boolean;
  editItem8: any;
  isEditAccount: boolean;
  isVisibleDelete: boolean;
  materialArr: any;
  blueprint: any;
  evacuationImages: any;
  imgSize: number;
  isVisible4: boolean;
  startDate: any;
  endDate: any;
  contractInfo: any;
  contractInfoTime: any;
  contractInfoServeTime: any;
  equipment: any;
  dictionariesList: any;
  dictionariesMap: any;
  isVisibleDelete6: any;
  imgList: any;
  isVisibleImgList: boolean;
  editItemImg: any;
  imgTitle: any;
  imagesList: any;
  certImage: any;
  logoImg: any;
  doorwayImages: any;
  buildAttributeMap: any;
  materialMap: any;
  dataSet3: any;
  isVisible3: boolean;
  orgTypeMap: any;
  notifyRuleList: any;
  editId: any;
  public listOfData: any[];
  i = 0;
  public planeImgList: any[];
  planeImgListShow = false;
  planeAddEdit = false;
  plane: any;
  editPlaneItem: any;
  lngEdit: any;
  latEdit: any;

  containerId = `${new Date().getTime()}`;
  inputAddress: any;
  listOfOption: any;
  locationConfig: any;
  location: any;
  streetList: any;
  communityList: any;
  streetId: any;
  communityId: any;
  rescuerArr: any;
  mapOptions: any;
  scale = 16;
  lng: number;
  lat: number;
  map: any;
  placeInfo: {};
  locationCache: number[];
  position: any;
  placeSearch: any;
  marker: any;
  geocoder: any;
  isShowMap = 'none';

  constructor(
    public activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private enumService: EnumService,
    private msg: NzMessageService,
    private global: Global
  ) {
    this.locationConfig = Global.getCityConfig();
    this.location = {
      provinceId: -1
    };
    this.mapOptions = {
      zoom: this.scale
    };
    this.lng = 120.133718;
    this.lat = 30.261314;
    this.map = undefined;
    this.placeInfo = {};
    this.locationCache = [0, 0];
    this.latEdit = 0;
    this.lngEdit = 0;
    this.planeImgList = [];
    this.plane = {};
    this.listOfData = [];
    this.levelMap = {};
    this.notifyRuleList = [];
    this.isVisible3 = false;
    this.dataSet3 = [];
    this.doorwayImages = [];
    this.imgTitle = '';
    this.imagesList = [];
    this.certImage = [];
    this.logoImg = [];
    this.isVisibleImgList = false;
    this.isVisibleDelete6 = false;
    this.equipment = {};
    this.isVisible6 = false;
    this.contractInfoServeTime = [];
    this.contractInfoTime = [];
    this.isVisible4 = false;
    this.isVisibleDelete = false;
    this.isEditAccount = false;
    this.isEdit = false;
    this.orgLogo = [];
    this.bulid = {};
    this.fileList = [
      //   {
      //     uid: 3,
      //     name: 3,
      //     status: 'done',
      //     url: ''
      //   }
    ];
    this.imgSize = 6;
    this.blueprint = [];
    this.evacuationImages = [];
    // this.orgTypeArr = this.enumService.orgTypeArr;
    this.orgType = 0;
    this.industry = 0;
    this.account = {
      name: '',
      phone: '',
      charactarId: 0
    };
    this.riskSourceMap = {};
    this.charactarMap = {};
    this.riskSource = {
      riskSourceId: '1',
      position: '',
      count: 1
    };
    this.locationConfig = Global.getCityConfig();
    this.location = {
      provinceId: -1,
      districtId: 0,
      cityId: 0
    };

    this.data = {
      orgName: '',
      orgShortName: '',
      orgTel: '',
      orgType: 0,
      address: '',
      provinceId: 0,
      cityId: 0,
      districtId: 0,
      ownershipType: 0,
      legalPerson: '',
      tel: '',
      industryCategory: 0,
      industry: 0,
      businessStatus: '1'
    };

    this.emergencyContact = {
      level: 100,
      contactInfoId: 0
    };

    this.contractInfo = {};

    this.teadList4 = [
      { name: '合同编号' },
      //   { name: '联网单位名称' },
      { name: '合同套餐' },
      { name: '合同开始时间' },
      { name: '合同结束时间' },
      { name: '服务开始时间' },
      { name: '服务结束时间' },
      { name: '商务人员' },
      { name: '商务人员电话' },
      { name: '关联保单号' },
      { name: '合同电子版' }
      //   { name: '操作' }
    ];
    this.keyNameList4 = [
      { type: 'text', name: 'contractSerial' },
      //   { type: 'text', name: 'orgName' },
      { type: 'text', name: 'package' },
      { type: 'time', name: 'startDate' },
      { type: 'time', name: 'endDate' },
      { type: 'time', name: 'serviceStartTime' },
      { type: 'time', name: 'serviceEndTime' },
      { type: 'text', name: 'businessUserName' },
      { type: 'text', name: 'businessUserPhone' },
      { type: 'text', name: 'insuranceSerial' },
      { type: 'url', name: 'url', text: '查看' }
      //   { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];
    this.dictionariesMap = {};
    this.buildAttributeMap = {};
    this.materialMap = {};
    this.buildAttributeArr = [];
    this.materialMap = this.enumService.materialMap;
    this.businessArr = this.enumService.businessArr;
    this.orgBuildTypeFindAll();
    this.orgAttributeFindAll();
    this.industryTypeFindAll();
    this.getOperationList();
    this.charactarSearch();
    this.getRiskSourceAll();
    this.notifyRuleSearchSetList();
    this.equipmentInfoFindAll(); //设备字典
    this.orgTypeFindAll(); //单位类型
    this.orgBuildMaterialFindAll(); //建筑材料
  }

  // 规则列表
  notifyRuleSearchSetList() {
    this.apiService.notifyRuleSearchSetList({}).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
        });
        this.notifyRuleList = response.data;
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

  // searchLevel() {
  //   this.apiService.searchLevel().then(response => {
  //     if (response && response.data) {
  //       let arr: { levelId: any; remark: string }[] = [];
  //       response.data.forEach((deveice: any) => {
  //         let text = '';
  //         deveice.list.forEach((item: any) => {
  //           text += item.remark;
  //         });
  //         arr.push({
  //           levelId: deveice.level,
  //           remark: text
  //         });
  //       });
  //       this.levelList = arr;
  //       arr.forEach(element => {
  //         this.levelMap.levelId = element.remark;
  //       });
  //     }
  //   });
  // }

  // 角色查询
  charactarSearch() {
    this.apiService.charactarSearch().then(response => {
      if (response && response.data) {
        let arr: any[] = [];
        response.data.forEach((element: any) => {
          if (element.category == 'ORG') {
            arr.push(element);
          }
        });
        this.charactarList = arr;
        console.log(response.data);
        this.charactarMap = this.enumService.getMap(arr);
      }
    });
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
      }
    });
  }

  // 行业归属
  industryTypeFindAll() {
    this.apiService.industryTypeFindAll().then(response => {
      if (response && response.data) {
        this.industryArr = response.data;
        // this.industryMap = this.enumService.getMap(response.data)
      }
    });
  }

  // 物业类型
  orgAttributeFindAll() {
    this.apiService.orgAttributeFindAll().then(response => {
      if (response && response.data) {
        this.industryCategoryArr = response.data;
        // this.industryCategoryMap = this.enumService.getMap(response.data);
      }
    });
  }

  // 建筑类型
  orgBuildTypeFindAll() {
    this.apiService.orgBuildTypeFindAll().then(response => {
      if (response && response.data) {
        console.log('建筑类型');
        console.log(response);
        this.buildAttributeArr = response.data;
        this.buildAttributeMap = this.enumService.getMap(response.data);
      }
    });
  }

  onLocationSelect(location: any) {
    this.location = location;
  }

  onChange(result: Date[]): void {
    this.serveStartTime = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.serveEndTime = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  ngOnInit(): void {
    if (this.global.getUserInfo().category === 'ORG') {
      this.orgId = this.global.getUserInfo().orgId;
      this.needHead = false;
    } else {
      this.orgId = this.activeRoute.snapshot.params['id'];
    }
    this.getData();
  }
  // 建筑结构类型
  orgBuildMaterialFindAll() {
    this.apiService.orgBuildMaterialFindAll().then(response => {
      if (response && response.data) {
        this.materialArr = response.data;
        this.materialArr.forEach((item: any) => {
          this.materialMap[item.id] = item.name;
          item.val = item.id;
        });
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

  // 设备列表字典
  equipmentInfoFindAll() {
    this.apiService.equipmentInfoFindAll().then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          this.dictionariesMap[element.id] = element;
        });
        this.dictionariesList = response.data;
        this.getOrgEquipmentInfo(); //设备设施
      }
    });
  }

  searchSetList() {
    this.apiService.searchLevel({ setId: this.data.notifyRuleSetId }).then(response => {
      if (response && response.data) {
        console.log(response);
        this.levelList = response.data;
        response.data.forEach((item: any) => {
          this.levelMap[item.level] = item.levelName;
        });
        this.getAccountList(); //账号列表
        this.orgContactInfo(); //紧急联系
      }
    });
  }

  getOrgEquipmentInfo() {
    this.apiService.getOrgEquipmentInfo(this.orgId).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.name = this.dictionariesMap[element.equipmentInfoId].name;
          element.unit = this.dictionariesMap[element.equipmentInfoId].unit;
          // element.levelText = this.levelMap[element.level];
          // element.charactarText = this.charactarMap[element.charactarId];
        });
        this.dataSet6 = response.data;
      }
    });
  }

  orgBuildInfo() {
    this.apiService.orgBuildInfo(this.orgId).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.buildAttributeText = this.buildAttributeMap[element.buildAttribute];
          element.materialText = this.materialMap[element.material];
        });
        this.dataSet2 = response.data;
        this.dataSet3 = response.data;
      }
    });
  }

  getContractInfo(data = {}) {
    data = this.apiService.filterData(data);
    this.apiService.contractInfoSearch(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.package = '默认套餐';
        });
        this.dataSet4 = response.data.content;
        this.total4 = response.data.totalElements; //总条数
      } else {
        this.dataSet4 = [];
        this.total4 = 0; //总条数
      }
    });
  }

  orgContactInfo() {
    //获取紧急联系人
    this.apiService.orgContactInfo({ orgId: this.data.id, page: 0, size: 1000 }).then(response => {
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

  tabChange(item: any) {
    console.log(item);
  }

  getData() {
    this.apiService.findOrgById(this.orgId).then(response => {
      if (response && response.data) {
        this.getOrgRiskSource(); //单位风险源列表
        this.orgBuildInfo(); //建筑信息
        this.data = response.data;
        console.log(this.data);
        this.getContractInfo({ orgSerial: response.data.orgSerial });
        this.location = {
          provinceId: response.data.provinceId,
          cityId: response.data.cityId,
          districtId: response.data.districtId
        };
        this.latEdit = response.data.latitude;
        this.lngEdit = response.data.longitude;

        if (this.data.images) {
          this.doorwayImages = JSON.parse(this.data.images);
        } else {
          this.doorwayImages = [];
        }
        if (this.data.logo) {
          this.logoImg = JSON.parse(this.data.logo);
        } else {
          this.logoImg = [];
        }
        if (this.data.certImage) {
          this.certImage = JSON.parse(this.data.certImage);
        } else {
          this.certImage = [];
        }
        this.searchSetList();
        this.date = [this.data.serveStartTime, this.data.serveEndTime];
      }
    });
  }

  turnPage(page: number) {
    console.log(page);
  }

  turnPage4(page: number) {
    console.log(page);
  }

  ngAfterViewInit() {
    this.initMap([this.lng, this.lat]);
  }

  private initMap(locations: [number, number]) {
    this.position = new window['AMap'].LngLat(this.lng, this.lat);
    this.locationCache = locations;
    if (this.lng && this.lat) {
      this.mapOptions.center = [this.lng, this.lat];
    } else {
      this.mapOptions.center = locations;
    }
    this.map = new AMap.Map(this.containerId, this.mapOptions);
    //输入提示
    let autoOptions = {
      input: 'tipinput'
    };
    let auto = new AMap.Autocomplete(autoOptions);
    this.geocoder = new AMap.Geocoder({
      // city: "010", //城市设为北京，默认：“全国”
      radius: 1000 //范围，默认：500
    });
    this.placeSearch = new AMap.PlaceSearch({
      map: this.map
    }); //构造地点查询类
    AMap.event.addListener(auto, 'select', (e: any) => {
      console.log(e);
      // this.lng = e.poi.location.lng;
      // this.lat = e.poi.location.lat;
      this.lngEdit = e.poi.location.lng;
      this.latEdit = e.poi.location.lat;
      this.map.setCenter([this.lngEdit, this.latEdit]); //设置地图中心点
      this.setMarker(e.poi.location.lng, e.poi.location.lat);
    }); //注册监听，当选中某条记录时会触发
    // 监听点击经纬度
    this.map.on('click', (e: any) => {
      this.lngEdit = e.lnglat.getLng();
      this.latEdit = e.lnglat.getLat();
      let lnglat = this.lngEdit + ',' + this.latEdit;
      this.regeoCode(lnglat);
      this.setMarker(e.lnglat.getLng(), e.lnglat.getLat());
    });
  }

  regeoCode(lnglat: any) {
    // marker.setPosition(lnglat);
    this.geocoder.getAddress(lnglat, (status: any, result: any) => {
      if (status === 'complete' && result.regeocode) {
        this.data.address = result.regeocode.formattedAddress;
      } else {
        console.log('根据经纬度查询地址失败');
      }
    });
  }

  clearMarker() {
    if (this.marker) {
      this.map.remove(this.marker);
    }
  }
  setMarker(Lng: any, Lat: any) {
    this.clearMarker();
    let src = 'assets/marker.jpg';
    let markerContent = `<div class='img-box'>
      <img src='${src}' id='animat' style='width:60px ;position:relative;animation:mymove 5s infinite;-webkit-animation:mymove 5s infinite; animation-direction:alternate;animation-timing-function: ease-in-out;-webkit-animation:mymove 5s infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function: ease-in-out;'/> </div>`;
    this.marker = new AMap.Marker({
      position: [Lng, Lat],
      content: markerContent,
      offset: new AMap.Pixel(-12, -12)
    });
    // 将 markers 添加到地图
    this.map.add(this.marker);
  }

  update(): void {
    // 编辑单位信息
    console.log(this.data);

    if (!this.data.orgName) {
      this.msg.error('请填写联网单位名称');
      return;
    }

    if (!this.data.operateId) {
      this.msg.error('请选择联网单位归属的运营中心');
      return;
    }

    if (!this.data.notifyRuleSetId) {
      this.msg.error('选择推送规则');
      return;
    }

    if (!this.lngEdit || !this.latEdit) {
      this.msg.error('点击详细地址右边按钮,选择详细定位地址');
      return;
    }

    this.data.longitude = this.lngEdit;
    this.data.latitude = this.latEdit;
    this.data.provinceId = this.location.provinceId;
    this.data.cityId = this.location.cityId;
    this.data.districtId = this.location.districtId;
    this.data.serveStartTime = this.serveStartTime;
    this.data.serveEndTime = this.serveEndTime;
    this.data.certImage = this.certImage[0] ? JSON.stringify(this.certImage) : ''; //营业执照图片
    this.data.images = this.doorwayImages[0] ? JSON.stringify(this.doorwayImages) : ''; //门头图片
    this.data.logo = this.logoImg[0] ? JSON.stringify(this.logoImg) : ''; //单位logo
    this.apiService.updateOrg(this.data).then(response => {
      if (response && response.success) {
        this.msg.success('编辑成功');
      } else {
        this.msg.error(response.message);
      }
    });
  }

  back() {
    this.router.navigate(['../..'], { relativeTo: this.activeRoute });
  }

  // 风险管理
  getOrgRiskSource() {
    this.apiService.getOrgRiskSource(this.orgId).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.nameText = this.riskSourceMap[element.riskSourceId].name;
        });
        this.dataSet5 = response.data;
      }
    });
  }

  turnPage5(page: number) {}

  editFun5(item: any) {
    this.riskSource = JSON.parse(JSON.stringify(item));
    if (item.btnIndex == 1) {
      this.isVisible5 = true;
    } else {
    }
  }
  editFun6(item: any) {
    this.equipment = JSON.parse(JSON.stringify(item));
    if (item.btnIndex == 1) {
      this.isVisible6 = true;
    } else {
      this.isVisibleDelete6 = true;
    }
  }

  editFun4(item: any) {}

  editFun2(item: any) {
    this.bulid = JSON.parse(JSON.stringify(item));
    this.fileList = this.bulid.images ? JSON.parse(item.images) : [];
    this.blueprint = this.bulid.blueprint ? JSON.parse(item.blueprint) : [];
    this.evacuationImages = this.bulid.evacuationImages ? JSON.parse(item.evacuationImages) : [];
    this.isVisible2 = true;
  }

  editFun3(item: any) {
    this.bulid = JSON.parse(JSON.stringify(item));
    this.blueprint = this.bulid.blueprint ? JSON.parse(item.blueprint) : [];
    this.isVisible3 = true;
  }

  addRiskSource() {
    this.isVisible5 = true;
    // this.createRiskSource
  }

  addBuild() {
    this.isVisible2 = true;
  }

  handleCancel5() {
    this.riskSource = {};
    this.isVisible5 = false;
  }

  addEquipment() {
    this.isVisible6 = true;
  }

  handleCancel6() {
    this.equipment = {};
    this.isVisible6 = false;
  }

  handleOk6() {
    if (this.equipment && this.equipment.id) {
      this.apiService.updateEquipment(this.equipment).then(response => {
        if (response && response.data) {
          this.isVisible6 = false;
          this.equipment = {};
          this.getOrgEquipmentInfo();
          this.msg.success('编辑成功');
        } else {
          this.isVisible5 = false;
          this.equipment = {};
          this.msg.error('编辑失败');
        }
      });
    } else {
      this.equipment.orgId = this.orgId;
      this.apiService.createEquipment(this.equipment).then(response => {
        if (response && response.data) {
          this.isVisible6 = false;
          this.getOrgEquipmentInfo();
          this.msg.success('添加成功');
        } else {
          this.isVisible6 = false;
          this.equipment = {};
          this.msg.error('添加失败');
        }
      });
    }
  }

  handleCancel2() {
    this.isVisible2 = false;
  }

  handleOk2() {
    if (!this.bulid.id) {
      this.bulid.orgId = this.orgId;
      this.bulid.images = this.fileList[0] ? JSON.stringify(this.fileList) : '';
      this.bulid.blueprint = this.blueprint[0] ? JSON.stringify(this.blueprint) : '';
      this.bulid.evacuationImages = this.evacuationImages[0] ? JSON.stringify(this.evacuationImages) : '';
      this.apiService.addOrgBuild(this.bulid).then(response => {
        if (response && response.data) {
          this.isVisible2 = false;
          this.orgBuildInfo();
          this.msg.success('添加成功');
        } else {
          this.isVisible2 = false;
          this.msg.error(response.message);
        }
      });
    } else {
      this.bulid.images = this.fileList[0] ? JSON.stringify(this.fileList) : '';
      this.bulid.blueprint = this.blueprint[0] ? JSON.stringify(this.blueprint) : '';
      this.bulid.evacuationImages = this.evacuationImages[0] ? JSON.stringify(this.evacuationImages) : '';
      this.apiService.updateOrgBuild(this.bulid).then(response => {
        if (response && response.data) {
          this.isVisible2 = false;
          this.orgBuildInfo();
          this.msg.success('操作成功');
        } else {
          this.isVisible2 = false;
          this.msg.error(response.message);
        }
      });
    }
    this.isVisible2 = false;
  }

  handleCancel4() {
    this.isVisible4 = false;
  }

  onChangeContractInfoServeTime(result: Date[]): void {
    this.serveStartTime = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.serveEndTime = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  onChangeContractInfoTime(result: Date[]): void {
    this.startDate = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.endDate = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  handleOk4() {
    let data = {
      orgId: this.orgId,
      startDate: this.startDate,
      endDate: this.endDate,
      serviceStartTime: this.serveStartTime,
      serviceEndTime: this.serveEndTime,
      contractSerial: this.contractInfo.contractSerial,
      url: this.fileList[0] ? this.fileList[0].url : '合同文本未上传',
      insuranceSerial: this.contractInfo.insuranceSerial,
      businessUserName: this.contractInfo.businessUserName,
      businessUserPhone: this.contractInfo.businessUserPhone
    };

    this.apiService.contractInfoCreate(data).then(response => {
      if (response && response.success) {
        this.isVisible4 = false;
        this.msg.success('添加成功');
        this.data = {
          contractSerial: '',
          insuranceSerial: '',
          url: ''
        };
      } else {
        this.msg.error(response.message);
        this.isVisible4 = false;
      }
    });
  }

  handleOk5() {
    if (this.riskSource && this.riskSource.id) {
      this.apiService.updateRiskSource(this.riskSource).then(response => {
        if (response && response.data) {
          this.isVisible5 = false;
          this.riskSource = {};
          this.getOrgRiskSource();
          this.msg.success('编辑成功');
        } else {
          this.isVisible5 = false;
          this.riskSource = {};
          this.msg.error('编辑失败');
        }
      });
    } else {
      this.riskSource.orgId = this.orgId;
      this.apiService.createRiskSource(this.riskSource).then(response => {
        if (response && response.data) {
          this.isVisible5 = false;
          this.getOrgRiskSource();
          this.msg.success('添加成功');
        } else {
          this.isVisible5 = false;
          this.riskSource = {};
          this.msg.error('添加失败');
        }
      });
    }
  }

  // 账号管理
  getAccountList() {
    this.apiService.getAccountList2({ orgId: this.data.id, page: 0, size: 1000 }).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          element.index = index;
          element.charactarText = element.charactarName;
        });
        this.dataSet8 = response.data.content;
      }
    });
  }

  // getRiskSourceAll() {
  // 	this.apiService.getRiskSourceAll().then(response => {
  // 		if (response && response.data) {
  // 			this.riskSourceAll = response.data
  // 		}
  // 	});
  // }

  turnPage8(page: number) {}

  editFun8(item: any) {
    this.account = JSON.parse(JSON.stringify(item));
    if (item.btnIndex == 1) {
      this.isEditAccount = true;
      this.isVisible8 = true;
    } else {
    }
  }

  deleteCancel() {
    this.isVisibleDelete = false;
  }

  deleteCancel6() {
    this.isVisibleDelete6 = false;
  }

  deleteOk6() {
    // 删除设备设施
    this.apiService.deleteEquipment(this.equipment.id).then(response => {
      if (response && response.data) {
        this.isVisibleDelete6 = false;
        this.getOrgEquipmentInfo();
        this.msg.success('操作成功');
      } else {
        this.isVisibleDelete6 = false;
        this.msg.error(response.message);
      }
    });
  }

  deleteOk() {
    // 删除
    this.apiService.orgContactInfoDelete({ id: this.emergencyContact.id }).then(response => {
      if (response && response.data) {
        this.isVisibleDelete = false;
        this.orgContactInfo();
        this.msg.success('操作成功');
      } else {
        this.isVisibleDelete = false;
        this.msg.error(response.message);
      }
    });
  }

  addContractInfo() {
    this.isVisible4 = true;
  }

  addAccount() {
    this.isEditAccount = false;
    this.isVisible8 = true;
  }

  handleCancel8() {
    this.isVisible8 = false;
  }
  handleOk8() {
    if (!this.isEditAccount) {
      this.account.orgId = this.orgId;
      this.apiService.createAccount(this.account).then(response => {
        if (response && response.data) {
          // this.riskSourceAll = response.data
          this.getAccountList();
          this.isVisible8 = false;
          this.account = {
            name: '',
            phone: '',
            charactarId: ''
          };
          this.msg.success('添加成功');
        } else {
          this.isVisible8 = false;
          this.msg.error(response.message);
        }
      });
    } else {
      this.apiService.accountUpdate(this.account).then(response => {
        if (response && response.data) {
          // this.riskSourceAll = response.data
          this.getAccountList();
          this.isVisible8 = false;
          this.account = {
            name: '',
            phone: '',
            charactarId: ''
          };
          this.msg.success('操作成功');
        } else {
          this.isVisible8 = false;
          this.msg.error(response.message);
        }
      });
    }
  }
  // 紧急联系人
  addContactInfo() {
    this.searchSetList();
    this.isVisible7 = true;
    this.emergencyContact = {};
    this.isEdit = false;
  }
  handleCancel7() {
    this.isVisible7 = false;
  }

  editFun7(item: any) {
    this.emergencyContact = JSON.parse(JSON.stringify(item));
    if (item.btnIndex == 1) {
      console.log(item);
      this.emergencyContact.contactInfoId = item.contactInfoId;
      this.emergencyContact.level = item.level;
      this.isVisible7 = true;
      this.isEdit = true;
    } else {
      this.isVisibleDelete = true;
    }
  }

  levelChange(level: any) {
    this.emergencyContact.level = level;
  }

  handleOk7() {
    if (!this.isEdit) {
      this.emergencyContact.orgId = this.orgId;
      this.apiService.orgContactInfoCreate(this.emergencyContact).then(response => {
        if (response && response.data) {
          // this.riskSourceAll = response.data
          this.isVisible7 = false;
          this.emergencyContact = {
            level: 100,
            contactInfoId: 0
          };
          this.orgContactInfo();
          this.msg.success('添加紧急联系人成功');
        } else {
          this.isVisible7 = false;
          this.msg.error(response.message);
        }
      });
    } else {
      console.log(this.emergencyContact);
      this.apiService.orgContactInfoUpdate({ id: this.emergencyContact.accountId, level: this.emergencyContact.level }).then(response => {
        if (response && response.success) {
          // this.riskSourceAll = response.data
          this.isVisible7 = false;
          this.emergencyContact = {
            // level: 100,
            // contactInfoId: 0
          };
          this.orgContactInfo();
          this.msg.success('操作成功');
        } else {
          this.isVisible7 = false;
          this.msg.error(response.message);
        }
      });
    }
  }

  getFileList(list: any) {
    console.log(list);
    this.fileList = list;
  }

  getFileListTest(list: any) {
    console.log(list);
  }

  getBlueprint(list: any) {
    this.blueprint = list;
    console.log(list);
  }

  getEvacuationImages(list: any) {
    this.evacuationImages = list;
    console.log(list);
  }
  getOrgLogo(list: any) {
    this.orgLogo = list;
    console.log(list);
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

  viewImg3(item: any) {
    console.log(item);
    this.imgTitle = '平面图';
    this.editItemImg = item;
    this.planeImgListShow = true;
    // if (item.imgType == 'images') {
    //   this.imgTitle = '外观图';
    // } else if (item.imgType == 'blueprint') {
    // this.imgTitle = '平面图';
    // } else if (item.imgType == 'evacuationImages') {
    //   this.imgTitle = '疏散图';
    // } else {
    //   this.imgTitle = '图片';
    // }
    // if (item[item.imgType] && item[item.imgType].length != 0) {
    //   this.imgList = JSON.parse(item[item.imgType]);
    // } else {
    //   this.imgList = [];
    // }
    if (item.imgType == 'blueprint') {
      let imgArr = JSON.parse(item.blueprint);
      let newArr: any[] = [];
      console.log(imgArr);
      imgArr.forEach((item: any, index: any) => {
        newArr.push({
          name: item.name,
          id: index + 1,
          url: item.url
        });
      });
      this.listOfData = [...newArr];
    }
  }

  imgListCancel() {
    this.isVisibleImgList = false;
  }
  imgListOk() {
    if (this.editItemImg.imgType == 'images') {
      if (this.imgList[0]) {
        this.editItemImg.images = JSON.stringify(this.imgList);
      } else {
        this.editItemImg.images = this.fileList[0] ? JSON.stringify(this.imgList) : '';
      }
    } else if (this.editItemImg.imgType == 'blueprint') {
      if (this.imgList[0]) {
        this.editItemImg.blueprint = JSON.stringify(this.imgList);
      } else {
        this.editItemImg.blueprint = this.blueprint[0] ? JSON.stringify(this.imgList) : '';
      }
    } else if (this.editItemImg.imgType == 'evacuationImages') {
      if (this.imgList[0]) {
        this.editItemImg.evacuationImages = JSON.stringify(this.imgList);
      } else {
        this.editItemImg.evacuationImages = this.evacuationImages[0] ? JSON.stringify(this.imgList) : '';
      }
      // this.editItemImg.evacuationImages = this.evacuationImages[0] ? JSON.stringify(this.imgList) : '';
    }
    this.apiService.updateOrgBuild(this.editItemImg).then(response => {
      if (response && response.data) {
        this.isVisibleImgList = false;
        this.orgBuildInfo();
        this.msg.success('操作成功');
      } else {
        this.isVisibleImgList = false;
        this.msg.error(response.message);
      }
    });
  }

  getImgList(list: any) {
    this.imgList = list;
  }

  getLogoImg(list: any) {
    this.logoImg = list;
  }

  getCertImage(list: any) {
    this.certImage = list;
  }

  getDoorwayImages(list: any) {
    this.doorwayImages = list;
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.plane = {};
    this.planeImgList = [];
    this.planeAddEditTittle = '添加楼层图片';
    this.planeAddEdit = true;
    // this.listOfData = [
    //   ...this.listOfData,
    //   {
    //     id: this.i + 100,
    //     name: '楼层名称' + (this.i + 1),
    //     imgList: []
    //   }
    // ];
    // this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  planeAddEditCancel() {
    this.planeAddEdit = false;
  }
  editPlane(item: any) {
    this.planeAddEdit = true;
    this.planeAddEditTittle = '添加楼层图片';
    this.editPlaneItem = item;
    console.log(item);
  }

  planeAddEditOk() {
    console.log(this.planeImgList);
    this.listOfData = [
      ...this.listOfData,
      {
        name: this.plane.name,
        url: this.planeImgList[0].url
      }
    ];
    this.planeAddEdit = false;
  }

  planeImgCancel() {
    let arr: { name: any; url: any }[] = [];
    this.listOfData.forEach(element => {
      arr.push({
        name: element.name,
        url: element.url
      });
    });
    this.editItemImg.blueprint = JSON.stringify(arr);
    this.apiService.updateOrgBuild(this.editItemImg).then(response => {
      if (response && response.data) {
        this.planeImgListShow = false;
        this.orgBuildInfo();
      } else {
        this.planeImgListShow = false;
        this.msg.error(response.message);
      }
    });
  }

  getGlaneImgList(list: any) {
    this.planeImgList = list;
  }

  showMap() {
    this.isShowMap = 'block';
  }

  sureAddress() {
    if (!this.data.address && this.inputAddress) {
      this.data.address = this.inputAddress;
    }
    this.isShowMap = 'none';
  }
}
