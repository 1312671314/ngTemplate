import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';
@Component({
  selector: 'app-rescuer-list',
  templateUrl: './list.component.html'
})
export class RescuerListComponent implements OnInit {
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
  name: any;
  center: any;
  orgNum: any;
  orgSerial: any;
  operateId: any;
  operationList: any;
  operationMap: any;
  rescuerMap: any = {
    0: '未知',
    1: '正常',
    2: '关闭'
  };
  constructor(
    private enumService: EnumService,
    private global: Global,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: ModalHelper,
    private apiService: ApiService
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
      { name: '消防站名称' },
      { name: '站点类型' },
      { name: '联系人' },
      { name: '岗位' },
      { name: '手机' },
      { name: '电话' },
      { name: '状态' },
      { name: '省市区' },
      { name: '详细地址' },
      { name: '操作' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'name' },
      { type: 'text', name: 'type' },
      { type: 'text', name: 'contactName' },
      { type: 'text', name: 'position' },
      { type: 'text', name: 'phone' },
      { type: 'text', name: 'tel' },
      { type: 'text', name: 'statusText' },
      { type: 'text', name: 'SSQ' },
      { type: 'text', name: 'address' },
      { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];
    this.dataSet = [];
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationList = response.data;
        this.operationMap = this.enumService.getMap(response.data);
      }
    });
  }

  ngOnInit(): void {
    this.getOperationList();
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgSerial: this.orgSerial,
      name: this.name,
      orgServeStatus: this.status,
      provinceId: this.location.provinceId,
      cityId: this.location.cityId,
      districtId: this.location.districtId,
      operateId: this.operateId
    };
    this.getData(data);
  }
  onLocationSelect(location: any) {
    this.location = location;
  }

  add(): void {
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute
    });
  }

  rest() {
    this.name = '';
    // this.location = {
    //   provinceId: '-1',
    //   cityId: '-1',
    //   districtId: '-1'
    // };
    // this.status = '-1';
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize
    };
    this.getData(data);
  }

  getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.rescuePointGetList(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.statusText = this.rescuerMap[element.status];
          element.SSQ = this.enumService.getSSQ(element.provinceId, element.cityId, element.districtId);
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
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      orgSerial: this.orgSerial,
      name: this.name,
      orgServeStatus: this.status,
      provinceId: this.location.provinceId,
      cityId: this.location.cityId,
      districtId: this.location.districtId,
      operateId: this.operateId
    };
    data = this.apiService.filterData(data);
    this.getData(data);
  }

  editFun(event: any) {
    this.router.navigate(['detail', event.id], {
      relativeTo: this.activatedRoute
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  turnPage(page: any) {
    let data = {
      page: page - 1,
      size: this.pageSize,
      orgSerial: this.orgSerial,
      name: this.name,
      orgServeStatus: this.status,
      provinceId: this.location.provinceId,
      cityId: this.location.cityId,
      districtId: this.location.districtId,
      operateId: this.operateId
    };
    this.getData(data);
  }
}
