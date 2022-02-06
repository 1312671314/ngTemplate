import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';

@Component({
  selector: 'app-setting-diary',
  templateUrl: './diary.component.html'
})
export class SettingDiaryComponent implements OnInit {
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
  processTypeMap: any;
  userTypeMap: any;
  constructor(
    private enumService: EnumService,
    private global: Global,
    private router: Router,
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
      { name: '操作人' },
      { name: '手机' },
      { name: '账号类型' },
      { name: '操作内容' },
      { name: '操作类型' },
      { name: '操作时间' }
      // { name: "操作" },
    ];
    this.keyNameList = [
      { type: 'text', name: 'subjectName' },
      { type: 'text', name: 'subjectPhone' },
      { type: 'text', name: 'subjectType' },
      { type: 'text', name: 'content' },
      { type: 'text', name: 'processType' },
      { type: 'time', name: 'createTime' }
      // { type: "buttonList", buttons: [{ text: "详情", index: 1 }] },
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
    this.userTypeMap = this.enumService.userTypeMap;
    this.processTypeMap = this.enumService.processTypeMap;
    let data = {
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
    this.getData(data);
  }
  onLocationSelect(location: any) {
    this.location = location;
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
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize
    };
    this.getData(data);
  }

  getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.processLogSearch(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.processType = this.processTypeMap[element.processType];
          if (element.subjectType == 'SYSTEM') {
            element.subjectType = '平台';
            element.subjectName = '系统';
            element.checkRemark = element.content;
          } else {
            element.subjectType = this.userTypeMap[element.subjectType];
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
    let data = {
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
    data = this.apiService.filterData(data);
    this.getData(data);
  }

  editFun(event: any) {
    this.router.navigate(['/org/org-detail'], {
      queryParams: { orgId: event.id }
    });
    console.log(event);
    // if (event.btnIndex == 1) {
    // 	this.isVisible = true;
    // } else {

    // }
  }

  handleCancel() {
    this.isVisible = false;
  }

  turnPage(page: any) {
    let data = {
      page: page - 1,
      size: this.pageSize
    };
    this.getData(data);
  }
}
