import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html'
})
export class OrgListComponent implements OnInit {
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  status: any;
  locationConfig: any;
  location: any;
  orgName: any;
  center: any;
  orgNum: any;
  orgSerial: any;
  operateId: any;
  operationList: any;
  operationMap: any;
  searchData: any;
  isPlatForm = false;
  constructor(
    private enumService: EnumService,
    private global: Global,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: ModalHelper,
    private apiService: ApiService,
    private cache: CacheService
  ) {
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;
    this.status = '-1';
    this.operationMap = {};
    this.locationConfig = Global.getCityConfig();
    this.location = {
      provinceId: -1
    };
    this.teadList = [
      { name: '联网单位编号' },
      { name: '联网单位名称' },
      { name: '联系人' },
      { name: '联系人电话' },
      { name: '运营中心' },
      { name: '服务状态' },
      { name: '操作' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'orgSerial' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'legalPerson' },
      { type: 'text', name: 'tel' },
      { type: 'text', name: 'centerName' },
      { type: 'text', name: 'serveStatus' },
      { type: 'buttonList', buttons: [{ text: '详情', index: 1 }] }
    ];
    this.dataSet = [];
    this.isPlatForm = this.enumService.isPlatForm();
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
        let cache: any = this.cache.getNone('searchData');
        if (cache) {
          this.pageIndex = cache.page;
          this.pageSize = cache.size;
          this.orgSerial = cache.orgSerial;
          this.operateId = cache.operateId;
          this.orgName = cache.orgName;
          this.status = cache.orgServeStatus;
          this.location = {
            provinceId: cache.provinceId,
            cityId: cache.cityId,
            districtId: cache.districtId
          };
          this.searchData = {
            page: this.pageIndex,
            size: this.pageSize,
            orgSerial: this.orgSerial,
            orgName: this.orgName,
            orgServeStatus: this.status,
            provinceId: this.location.provinceId,
            cityId: this.location.cityId,
            districtId: this.location.districtId,
            operateId: this.operateId
          };
          this.cache.remove('searchData');
          this.getData(this.searchData);
        } else {
          this.searchData = {
            page: this.pageIndex - 1,
            size: this.pageSize,
            orgSerial: this.orgSerial,
            orgName: this.orgName,
            orgServeStatus: this.status,
            provinceId: this.location.provinceId,
            cityId: this.location.cityId,
            districtId: this.location.districtId,
            operateId: this.operateId
          };
          this.getData(this.searchData);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getOperationList();
  }
  onLocationSelect(location: any) {
    this.location = location;
  }

  add(): void {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  rest() {
    this.operateId = '';
    this.orgName = '';
    this.orgSerial = '';
    this.location = {
      provinceId: '-1',
      cityId: '-1',
      districtId: '-1'
    };

    this.status = '-1';
    this.searchData = {
      page: this.pageIndex - 1,
      size: this.pageSize
    };
    this.getData(this.searchData);
  }

  getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.getOrgList(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          if (element.operateId) {
            element.centerName = this.operationMap[element.operateId] ? this.operationMap[element.operateId].name : '-';
          }
          if (element.serveEndTime > new Date().getTime()) {
            element.serveStatus = '服务中';
          } else {
            element.serveStatus = '已过期';
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

  export() {}

  search() {
    this.searchData = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgSerial: this.orgSerial,
      orgName: this.orgName,
      orgServeStatus: this.status,
      provinceId: this.location.provinceId,
      cityId: this.location.cityId,
      districtId: this.location.districtId,
      operateId: this.operateId
    };
    this.getData(this.searchData);
  }

  editFun(event: any) {
    this.cache.set('searchData', this.searchData);
    this.router.navigate(['detail', event.id], { relativeTo: this.activatedRoute });
  }

  handleCancel() {
    this.isVisible = false;
  }

  turnPage(page: any) {
    this.searchData = {
      page: page - 1,
      size: this.pageSize,
      orgSerial: this.orgSerial,
      orgName: this.orgName,
      orgServeStatus: this.status,
      provinceId: this.location.provinceId,
      cityId: this.location.cityId,
      districtId: this.location.districtId,
      operateId: this.operateId
    };
    this.getData(this.searchData);
  }
}
