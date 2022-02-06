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
  selector: 'app-operation-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class OperationDetailComponent implements OnInit {
  containerId = `${new Date().getTime()}`;
  locationConfig: any;
  location: any;
  operation: any;
  isShowMap = 'none';
  inputAddress: any;
  mapOptions: any;
  scale = 11;
  lng: any;
  lat: any;
  map: any;
  placeInfo: any;
  locationCache: any;
  lngEdit: any;
  latEdit: any;
  marker: any;
  geocoder: any;
  position: any;
  placeSearch: any;
  id: any;
  constructor(
    private global: Global,
    private router: Router,
    private modal: ModalHelper,
    private apiService: ApiService,
    private msg: NzMessageService,
    private enumService: EnumService,
    private activatedRoute: ActivatedRoute
  ) {
    this.locationConfig = Global.getCityConfig();
    this.location = {
      provinceId: -1
    };
    this.operation = {
      name: ''
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

  showMap() {
    this.isShowMap = 'block';
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.apiService.getOperationById(this.id).then((res: any) => {
      if (res && res.data) {
        this.operation = res.data;
        this.latEdit = res.data.latitude;
        this.lngEdit = res.data.longitude;
        this.location = {
          provinceId: res.data.provinceId,
          cityId: res.data.cityId,
          districtId: res.data.districtId
        };
      } else {
        this.operation = {};
      }
    });
  }

  back() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  add() {
    if (!this.operation.name) {
      this.msg.error('请填写运营中心名称');
      return;
    }
    if (!this.lngEdit || !this.latEdit) {
      this.msg.error('点击详细地址右边按钮,选择详细定位地址');
      return;
    }
    this.operation.provinceId = this.location.provinceId;
    this.operation.cityId = this.location.cityId;
    this.operation.districtId = this.location.districtId;
    this.operation.longitude = this.lngEdit;
    this.operation.latitude = this.latEdit;
    this.apiService.updateOperation(this.operation).then(response => {
      if (response && response.data) {
        this.msg.success('编辑成功');
        this.back();
      } else {
        this.msg.error('添加失败');
      }
    });
  }

  sureAddress() {
    if (!this.operation.address && this.inputAddress) {
      this.operation.address = this.inputAddress;
    }
    this.isShowMap = 'none';
  }

  closeMap() {
    this.isShowMap = 'none';
  }

  handleCancel() {
    this.operation.name = '';
    this.location = {
      provinceId: -1
    };
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
        this.operation.address = result.regeocode.formattedAddress;
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

  onLocationSelect(location: any) {
    this.location = location;
    // if (!this.location.districtId || this.location.districtId == -1) {
    //   return;
    // } else {
    //   this.streetId = -1;
    //   this.communityId = -1;
    //   let data = await this.provinceCityDistrict(this.location.districtId);
    //   if (data && data.data) {
    //     this.streetList = data.data.streetList;
    //   } else {
    //     this.streetList = [];
    //   }
  }
}
