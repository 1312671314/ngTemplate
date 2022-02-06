import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-rescuer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RescuerDetailComponent implements OnInit {
  containerId = `${new Date().getTime()}`;
  public data: any;
  public serveTime: any;
  public serveStartTime: any;
  public serveEndTime: any;
  public startDate: any;
  public endDate: any;
  public time: any;
  public fileList: any;
  listOfOption: any;
  operationList: any;
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
  isShowMap: string;
  placeSearch: any;
  marker: any;
  geocoder: any;
  rescuerMap = {
    0: '未知',
    1: '正常',
    2: '关闭'
  };
  rescuerTypeList = [
    { name: '社区微型消防站' },
    { name: '单位微型消防站' },
    { name: '专业消防救援队' },
    { name: '派出所' },
    { name: '其他救援力量' }
  ];
  id: any;
  lngEdit: any;
  latEdit: any;
  inputAddress: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msg: NzMessageService,
    private http: _HttpClient,
    private global: Global,
    private apiService: ApiService,
    private enumService: EnumService
  ) {
    this.isShowMap = 'none';
    this.data = {};
    this.serveTime = [];
    this.time = [];
    this.fileList = [];
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
  }
  nzFilterOption = () => true;

  ngOnInit(): void {
    this.rescuerArr = this.enumService.rescuerArr;
    this.getOperationList();
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
      this.lngEdit = e.poi.location.lng;
      this.latEdit = e.poi.location.lat;
      this.map.setCenter([this.lngEdit, this.latEdit]); //设置地图中心点
      this.setMarker(e.poi.location.lng, e.poi.location.lat);
    }); //注册监听，当选中某条记录时会触发
    // 监听点击经纬度
    this.map.on('click', (e: any) => {
      console.log(e);
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

  showMap() {
    this.isShowMap = 'block';
  }

  async onLocationSelect(location: any) {
    this.location = location;
    if (!this.location.districtId || this.location.districtId == -1) {
      return;
    } else {
      this.streetId = -1;
      this.communityId = -1;
      let data = await this.provinceCityDistrict(this.location.districtId);
      if (data && data.data) {
        this.streetList = data.data.streetList;
      } else {
        this.streetList = [];
      }
    }
  }

  async streetChange(id: any) {
    let data = await this.provinceCityDistrict(id);
    if (data && data.data) {
      this.communityList = data.data.communityList;
    } else {
      this.communityList = [];
    }
  }

  async provinceCityDistrict(id: any) {
    return await this.apiService.provinceCityDistrict(id);
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.id = this.activatedRoute.snapshot.params['id'];
        console.log(this.id);
        this.getData({ id: this.id });
      }
    });
  }

  async getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.rescuePointGetList(data).then(async response => {
      if (response && response.data) {
        let list = response.data.content[0];
        this.location = {
          provinceId: list.provinceId,
          cityId: list.cityId,
          districtId: list.districtId
        };
        if (this.location.districtId) {
          this.provinceCityDistrict(this.location.districtId).then((res: any) => {
            if (res && res.data) {
              this.streetList = res.data.streetList;
              this.provinceCityDistrict(list.streetId).then((res: any) => {
                if (res && res.data) {
                  this.communityList = res.data.communityList;
                } else {
                  this.communityList = [];
                }
                this.data = list;
                this.operationList.forEach((item: any) => {
                  if (item.id == list.operateId) {
                    this.data.operate = item;
                  }
                });
                this.latEdit = list.latitude;
                this.lngEdit = list.longitude;
              });
            } else {
              this.streetList = [];
            }
          });
        }
      } else {
        this.data = {};
      }
    });
  }

  add() {
    if (!this.data.name) {
      this.msg.error('请填写消防站名称');
      return;
    }
    if (!this.data.operate || !this.data.operate.id) {
      this.msg.error('请选择运营中心');
      return;
    }

    if (!this.lngEdit || !this.latEdit) {
      this.msg.error('点击详细地址右边按钮,选择详细定位地址');
      return;
    }
    this.data.operateId = this.data.operate.id;
    this.data.provinceId = this.location.provinceId;
    this.data.cityId = this.location.cityId;
    this.data.districtId = this.location.districtId;
    if (this.latEdit) {
      this.data.longitude = this.lngEdit;
      this.data.latitude = this.latEdit;
    }
    console.log(this.data);
    let data = this.apiService.filterData(this.data);
    this.apiService.rescuePointUpdate(data).then(response => {
      if (response && response.success) {
        this.msg.success('编辑成功');
        this.back();
      } else {
        this.msg.error(response.message);
      }
    });
  }

  search(value: string): void {
    console.log(this.data);
    let data = {
      orgName: value
    };
    data = this.apiService.filterData(data);
    this.apiService.getOrgList(data).then(response => {
      console.log(response);
      if (response && response.data) {
        this.listOfOption = response.data.content;
      } else {
        this.listOfOption = [];
      }
    });
  }

  onChangeServeTime(result: Date[]): void {
    this.serveStartTime = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.serveEndTime = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  onChangeTime(result: Date[]): void {
    this.startDate = new Date(new Date(new Date(result[0]).toLocaleDateString()).getTime()).getTime();
    this.endDate = new Date(new Date(new Date(result[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  }

  back() {
    this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
  }
  getFileList(list: any) {
    this.fileList = list;
    console.log(list);
  }

  sureAddress() {
    if (!this.data.address && this.inputAddress) {
      this.data.address = this.inputAddress;
    }
    this.isShowMap = 'none';
  }

  provinceChange(event: any) {
    this.location = {
      provinceId: event.provinceId,
      cityId: event.cityId,
      districtId: event.districtId
    };
    this.onLocationSelect(this.location);
  }
}
