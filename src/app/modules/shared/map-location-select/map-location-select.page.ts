import { Global } from 'src/app/modules/app/services/global.service';
import { Component, OnDestroy, AfterViewInit, Input } from '@angular/core';
// import { ModalController } from '@ionic/angular';

import * as AMapModel from '@amap/amap-jsapi-types';
// import { LocationService } from 'src/app/services/location.service';
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
};

@Component({
  selector: 'map-location-select',
  templateUrl: './map-location-select.page.html',
  styleUrls: ['./map-location-select.page.scss']
})
export class MapLocationSelectPage implements AfterViewInit, OnDestroy {
  @Input() lng: number;
  @Input() lat: number;
  containerId = `${new Date().getTime()}`;
  mapOptions: AMap.MapOptions;
  map: any;
  marker: any;
  placeInfo: any;
  locationCache: [number, number];
  scale = 16;
  address = '';
  searchText = '';
  moveBySelect = false;
  searchItems: any[] = [];
  position: any;
  constructor(private global: Global) {
    this.mapOptions = {
      zoom: this.scale
    };
    this.lng = 116.577358;
    this.lat = 40.064112;
    this.map = undefined;
    this.placeInfo = {};
    this.locationCache = [0, 0];
  }

  ngAfterViewInit() {
    this.initGps();
  }

  private initGps() {
    this.position = new window['AMap'].LngLat(116.397428, 39.90923);
    this.initMap([this.lng, this.lat]);
  }

  private initMap(locations: [number, number]) {
    this.locationCache = locations;
    if (this.lng && this.lat) {
      this.mapOptions.center = [this.lng, this.lat];
      this.locationChange(this.lng, this.lat);
    } else {
      this.mapOptions.center = locations;
      this.locationChange(locations[0], locations[1]);
    }
    this.map = new AMap.Map(this.containerId, this.mapOptions);
    const icon = new AMap.Icon({
      size: new AMap.Size(24, 24),
      image: '../../../assets/marker.jpg', // Icon的图像
      imageSize: new AMap.Size(24, 24)
    });

    // this.marker = new AMap.Marker({
    //   position: locations,
    //   offset: new AMap.Pixel(-12, -12), // 图像相对展示区域的偏移量，适于雪碧图等
    //   icon
    // });
    // this.map.add(this.marker);

    // 点标记显示内容，HTML要素字符串
    let markerContent =
      "<div class='img-box'>" +
      "<img src='../../../assets/red.png' id='animat' style='width:60px ;position:relative;animation:mymove 5s infinite;-webkit-animation:mymove 5s infinite; animation-direction:alternate;animation-timing-function: ease-in-out;-webkit-animation:mymove 5s infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function: ease-in-out;'/> </div>";
    this.marker = new AMap.Marker({
      position: locations,
      content: markerContent,
      // icon,
      // 以 icon 的 [center bottom] 为原点
      offset: new AMap.Pixel(-12, -12)
    });

    // 将 markers 添加到地图
    this.map.add(this.marker);

    // 清除 marker

    this.marker.on('touchend', () => {
      const cache = this.marker.getPosition();
      console.log('touchend');
    });
    this.marker.on('click', () => {
      console.log('click');
    });
    this.map.on('moveend', () => {
      const cache = this.map.getCenter();
      // this.locationCache = [cache.getLng(), cache.getLat()];
      // this.marker.setPosition([cache.getLng(), cache.getLat()]);
      if (!this.moveBySelect) {
        this.locationChange(cache.getLng(), cache.getLat());
      } else {
        this.moveBySelect = false;
      }
    });
  }

  clearMarker() {
    this.map.remove(this.marker);
  }

  locationChange(lng: number, lat: number) {
    // this.locationService.regeo(lng, lat).then((response: any) => {
    // });
  }

  resetPosition() {
    this.map.setZoomAndCenter(this.scale, this.locationCache);
    // this.marker.setPosition(this.locationCache);
  }

  choose(placeInfo: any, dontMove?: boolean) {
    this.placeInfo = placeInfo;
    console.log(this.map);
    const location = placeInfo.location.split(',');
    // this.locationChange(+location[0], +location[1]);
    this.moveBySelect = true;
    if (!dontMove) {
      this.map.setZoomAndCenter(this.scale, location);
    }
  }

  search(place: string) {}

  ngOnDestroy() {
    // if (this.map) {
    //   this.map.destroy();
    // }
  }
}
