import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';

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
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.css']
})
export class OrgAddComponent implements OnInit {
  public tabs = [
    { name: '基本信息', temp: 1 },
    { name: '建筑信息', temp: 2 },
    { name: '建筑图纸', temp: 3 },
    { name: '商务合同', temp: 4 },
    { name: '紧急联系人', temp: 5 },
    { name: '消防设施', temp: 6 },
    { name: '单位账号', temp: 7 }
  ];
  public name: string;
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
  public locationConfig;
  public location: any;
  public orgType: any;
  industryCategoryArr: any;
  form!: FormGroup;
  submitting = false;
  data: any;
  operationList: any;
  date: any;
  serveStartTime: any;
  serveEndTime: any;
  orgServeStatus: any;
  doorwayImages: any;
  certImage: any;
  imagesList: any;
  logoImg: any;
  notifyRuleList: any;
  isShowMap = 'none';
  inputAddress = '';
  latEdit = 0;
  lngEdit = 0;

  containerId = `${new Date().getTime()}`;
  listOfOption: any;
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
  constructor(
    private fb: FormBuilder,
    private modal: ModalHelper,
    private apiService: ApiService,
    private enumService: EnumService,
    private global: Global,
    private msg: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.logoImg = [];
    this.certImage = [];
    this.doorwayImages = [];
    this.orgType = 0;
    this.industry = 0;
    this.name = '';
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

    this.orgAttributeFindAll();
    this.industryTypeFindAll();
    this.notifyRuleSearchSetList();
  }

  // 行业归属
  industryTypeFindAll() {
    this.apiService.industryTypeFindAll().then(response => {
      if (response && response.data) {
        this.industryArr = response.data;
      }
    });
  }

  // 物业类型
  orgAttributeFindAll() {
    this.apiService.orgAttributeFindAll().then(response => {
      if (response && response.data) {
        this.industryCategoryArr = response.data;
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

  //   getOperationList() {
  //     this.apiService.getOperationList().then(response => {
  //       if (response && response.data) {
  //         this.operationList = response.data;
  //       }
  //     });
  //   }

  orgTypeFindAll() {
    this.apiService.orgTypeFindAll().then(response => {
      if (response && response.data) {
        this.orgTypeArr = response.data;
        // this.orgTypeMap = this.enumService.getMap(this.orgTypeArr);
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

  // 规则列表
  notifyRuleSearchSetList() {
    this.apiService.notifyRuleSearchSetList({}).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          // if (element.operateId) {
          //   element.centerName = this.operationMap[element.operateId].name;
          // }
          // element.typeName = element.type ? '运营中心' : '系统默认';
          // element.setName = element.setList[0] ? element.setList[0].setName : '无';
        });
        this.notifyRuleList = response.data;
      }
    });
  }

  ngOnInit(): void {
    this.orgTypeFindAll();
    this.getOperationList();
    console.log(this.enumService);
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
      businessStatus: 1
    };
  }

  add(): void {
    // this.form

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

    console.log(this.data);
    this.data.provinceId = this.location.provinceId;
    this.data.cityId = this.location.cityId;
    this.data.districtId = this.location.districtId;
    this.data.serveStartTime = this.serveStartTime;
    this.data.serveEndTime = this.serveEndTime;
    this.data.notifyRuleSetId = 1;
    this.data.certImage = this.certImage[0] ? JSON.stringify(this.certImage) : ''; //营业执照图片
    this.data.images = this.doorwayImages[0] ? JSON.stringify(this.doorwayImages) : ''; //门头图片
    this.data.logo = this.logoImg[0] ? JSON.stringify(this.logoImg) : ''; //单位logo

    this.apiService.addOrg(this.data).then(response => {
      if (response && response.success) {
        this.msg.success('创建成功');
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
          industry: 0
        };
        this.imagesList = [];
        this.logoImg = [];
        this.certImage = [];
      } else {
        if (response && response.message) {
          this.msg.error(response.message);
        } else {
          this.msg.error('创建失败');
        }
      }
    });
  }

  back() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  getDoorwayImages(list: any) {
    this.doorwayImages = list;
  }

  getLogoImg(list: any) {
    this.logoImg = list;
  }

  getCertImage(list: any) {
    this.certImage = list;
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
}
