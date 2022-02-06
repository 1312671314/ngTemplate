import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { getData } from 'ajv/dist/compile/validate';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';

@Component({
  selector: 'app-business-business-detail',
  templateUrl: './business-detail.component.html'
})
export class BusinessBusinessDetailComponent implements OnInit {
  public data: any;
  public serveTime: any;
  public serveStartTime: any;
  public serveEndTime: any;
  public startDate: any;
  public endDate: any;
  public time: any;
  public fileList: any;
  listOfOption: any;
  id: any;
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private http: _HttpClient,
    private modal: ModalHelper,
    private apiService: ApiService,
    public activeRoute: ActivatedRoute
  ) {
    this.data = {};
    this.serveTime = [];
    this.time = [];
    this.fileList = [];
  }
  nzFilterOption = () => true;

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.apiService.contractInfoByid(this.id).then(response => {
      if (response && response.data) {
        this.data = response.data;
        if (this.data.url) {
          this.fileList = [
            {
              uid: 3,
              name: '点击下载合同',
              status: 'done',
              url: this.data.url
            }
          ];
        }
        this.serveTime = [this.data.serveStartTime, this.data.serveEndTime];
        this.startDate = this.data.startDate;
        this.endDate = this.data.endDate;
        this.serveStartTime = this.data.serveStartTime;
        this.serveEndTime = this.data.serveEndTime;
        this.time = [this.data.startDate, this.data.endDate];
        this.search(this.data.orgName);
      }
    });
  }

  save() {
    let data = {
      id: this.id,
      orgId: this.data.id,
      startDate: this.startDate,
      endDate: this.endDate,
      serviceStartTime: this.serveStartTime,
      serviceEndTime: this.serveEndTime,
      contractSerial: this.data.contractSerial,
      url: this.fileList[0] ? this.fileList[0].url : '合同文本未上传',
      insuranceSerial: this.data.insuranceSerial,
      businessUserName: this.data.businessUserName,
      businessUserPhone: this.data.businessUserPhone
    };

    this.apiService.contractInfoUpdate(data).then(response => {
      if (response && response.success) {
        this.msg.success('编辑成功');
      } else {
        this.msg.error(response.message);
      }
    });
  }

  search(value: string): void {
    console.log(this.data);
    let data = {
      orgName: value,
      page: 0,
      size: 10
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
    this.router.navigate(['../..'], { relativeTo: this.activeRoute });
  }

  getFileList(list: any) {
    this.fileList = list;
    console.log(list);
  }
}
