import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

@Component({
  selector: 'app-vigilance-real-time-detail',
  templateUrl: './real-time-detail.component.html'
})
export class VigilanceRealTimeDetailComponent implements OnInit {
  id: any;
  deviceId: any;
  deviceInfo: any;
  orgInfo: any;
  deviceTypeMap: any;
  historyTypeList: any;
  type: any;
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  historyData: any;
  messageType: any;
  constructor(
    public activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private enumService: EnumService,
    private msg: NzMessageService
  ) {
    this.isVisible = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.messageType = '1';
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.queryParams['id'];
    this.deviceFindById();
  }

  deviceFindById() {
    this.apiService.searchFireAlarm({ id: this.id }).then(response => {
      console.log(response);
      if (response && response.data) {
        this.deviceInfo = response.data;
        if (this.deviceInfo && this.deviceInfo.orgId) {
          this.getOrgInfo();
        }
      }
    });
  }

  getOrgInfo() {
    this.apiService.findOrgById(this.deviceInfo.orgId).then(response => {
      console.log(response);
      if (response && response.data) {
        this.orgInfo = response.data;
        // this.location = {
        // 	provinceId: response.data.provinceId,
        // 	cityId: response.data.cityId,
        // 	districtId: response.data.districtId,
        // };
        // this.date = [this.data.serveStartTime,this.data.serveEndTime]
      }
    });
  }

  setDevice() {}

  turnPage(page: any) {}
}
