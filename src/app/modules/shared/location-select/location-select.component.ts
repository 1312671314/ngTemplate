import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Global } from 'src/app/modules/app/services/global.service';
import { LocationInfo } from './location-info';

@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
  providers: [Global]
})
export class LocationSelectComponent {
  public locationConfig: any;
  p = '-1';
  c = '-1';
  d = '-1';
  @Input() locationInfo: LocationInfo;
  @Input() isDisabled: boolean;
  @Input() sizes: number;
  @Input() isShowAll;
  @Input() isHide;
  @Output() onLocationSelect = new EventEmitter<LocationInfo>();

  constructor() {
    this.locationConfig = Global.getCityConfig();
    this.locationInfo = new LocationInfo();
    this.isDisabled = false;
    this.sizes = 8;
    this.isShowAll = false;
    this.isHide = false;
    // console.log(this.isDisabled)
  }

  provinces(): Array<string> {
    return Object.keys(this.locationConfig.province);
  }

  getProvince(provinceId: any): any {
    if (provinceId == -1) return { id: '', name: '' };
    return this.locationConfig.province[provinceId];
  }

  provinceChange(provinceId: number): void {
    console.log(provinceId);
    this.c = '-1';
    this.d = '-1';
    this.locationInfo.provinceId = provinceId;
    this.locationInfo.provinceName = this.getProvince(this.locationInfo.provinceId).name;
    this.locationInfo.cityId = -1;
    this.locationInfo.cityName = '';
    this.locationInfo.districtId = -1;
    this.locationInfo.districtName = '';
    this.onLocationSelect.emit(this.locationInfo);
  }

  cities(provinceId: number): Array<string> {
    if (provinceId) {
      if (provinceId == -1) return [];
      return Object.keys(this.locationConfig.province[provinceId].cites);
    } else {
      return [];
    }
  }

  getCity(provinceId: number, cityId: any): any {
    if (cityId) {
      if (provinceId == -1 || cityId == -1) return { id: '', name: '' };
      return this.locationConfig.province[provinceId].cites[cityId];
    }
  }

  cityChange(cityId: any): void {
    this.d = '-1';
    this.locationInfo.cityId = cityId;
    this.locationInfo.cityName = this.getCity(this.locationInfo.provinceId, this.locationInfo.cityId).name;
    this.locationInfo.districtId = -1;
    this.locationInfo.districtName = '';
    this.onLocationSelect.emit(this.locationInfo);
  }

  districts(provinceId: number, cityId: number): Array<string> {
    if (provinceId && cityId) {
      if (provinceId == -1 || cityId == -1) return [];
      if (!this.locationConfig.province[provinceId].cites[cityId]) return [];
      return Object.keys(this.locationConfig.province[provinceId].cites[cityId].districts);
    } else {
      return [];
    }
  }

  getDistrict(provinceId: number, cityId: number, districtId: any): any {
    if (cityId && districtId) {
      if (provinceId == -1 || cityId == -1 || districtId == -1) return { id: '', name: '' };
      return this.locationConfig.province[provinceId].cites[cityId].districts[districtId];
    }
  }

  districtChange(districtId: number): void {
    this.locationInfo.districtId = districtId;
    this.locationInfo.districtName = this.getDistrict(
      this.locationInfo.provinceId,
      this.locationInfo.cityId,
      this.locationInfo.districtId
    ).name;
    this.onLocationSelect.emit(this.locationInfo);
  }

  ngOnChanges(changes: any) {
    console.log(changes);
    if (changes['locationInfo']) {
      const location = changes['locationInfo'].currentValue;
      if (location.provinceId) {
        this.p = location.provinceId;
      }
      if (location.cityId) {
        this.c = location.cityId;
      }
      if (location.districtId) {
        this.d = location.districtId;
      }
    }

    // console.log(changes);
    // this.sizes = changes["sizes"].currentValue;
    // console.log(this.sizes);
  }
}
