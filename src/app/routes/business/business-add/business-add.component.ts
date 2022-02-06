import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';

@Component({
  selector: 'app-business-business-add',
  templateUrl: './business-add.component.html'
})
export class BusinessBusinessAddComponent implements OnInit {
  public data: any;
  public serveTime: any;
  public serveStartTime: any;
  public serveEndTime: any;
  public startDate: any;
  public endDate: any;
  public time: any;
  public fileList: any;
  listOfOption: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msg: NzMessageService,
    private http: _HttpClient,
    private modal: ModalHelper,
    private apiService: ApiService
  ) {
    this.data = {};
    this.serveTime = [];
    this.time = [];
    this.fileList = [];
  }
  nzFilterOption = () => true;

  ngOnInit(): void {}

  add() {
    console.log(this.fileList);
    console.log(this.data);
    if (!this.data.org || !this.data.org.id) {
      this.msg.error('请选择合同关联的单位');
    } else {
      let data = {
        orgId: this.data.org.id,
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

      this.apiService.contractInfoCreate(data).then(response => {
        if (response && response.success) {
          this.msg.success('添加成功');
          this.back();
        } else {
          this.msg.error(response.message);
        }
      });
    }
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
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
  getFileList(list: any) {
    this.fileList = list;
    console.log('图片文件' + list);
  }
}
