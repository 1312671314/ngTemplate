import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';
@Component({
  selector: 'app-business-business-list',
  templateUrl: './business-list.component.html'
})
export class BusinessBusinessListComponent implements OnInit {
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
  contractSerial: any;
  businessUserName: any;
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
      { name: '合同编号' },
      { name: '联网单位名称' },
      { name: '合同套餐' },
      { name: '合同开始时间' },
      { name: '合同结束时间' },
      { name: '服务开始时间' },
      { name: '服务结束时间' },
      { name: '商务人员' },
      { name: '商务人员电话' },
      { name: '关联保单号' },
      { name: '合同电子版' },
      { name: '操作' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'contractSerial' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'package' },
      { type: 'time', name: 'startDate' },
      { type: 'time', name: 'endDate' },
      { type: 'time', name: 'serviceStartTime' },
      { type: 'time', name: 'serviceEndTime' },
      { type: 'text', name: 'businessUserName' },
      { type: 'text', name: 'businessUserPhone' },
      { type: 'text', name: 'insuranceSerial' },
      { type: 'url', name: 'url', text: '下载' },
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
      contractSerial: this.contractSerial,
      orgName: this.orgName,
      businessAccount: this.businessUserName
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
    this.businessUserName = '';
    this.orgName = '';
    this.contractSerial = '';
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize
    };
    this.getData(data);
  }

  getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.contractInfoSearch(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.package = '默认套餐';
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
      contractSerial: this.contractSerial,
      orgSerial: this.orgName,
      businessAccount: this.businessUserName
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
      page: page,
      size: this.pageSize,
      orgSerial: this.orgSerial,
      orgName: this.orgName,
      orgServeStatus: this.status,
      provinceId: this.location.provinceId,
      cityId: this.location.cityId,
      districtId: this.location.districtId,
      operateId: this.operateId
    };
    this.getData(data);
  }
}
