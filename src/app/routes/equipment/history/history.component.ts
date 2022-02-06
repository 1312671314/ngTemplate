import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';

@Component({
  selector: 'app-equipment-history',
  templateUrl: './history.component.html'
})
export class EquipmentHistoryComponent implements OnInit {
  searchVal: string;
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  pageSizeOrg;
  pageIndexOrg;
  dataSetOrg: any;
  totalOrg: number;
  editItem: any;
  orgItem: any;
  checkConpany: any;
  constructor(private msg: NzMessageService, private apiService: ApiService) {
    this.searchVal = '';
    this.pageSize = 10;
    this.pageIndex = 1;
    this.pageSizeOrg = 10;
    this.pageIndexOrg = 1;
    this.isVisible = false;
    this.teadList = [
      { name: '网关id' },
      { name: '网关编号' },
      { name: '认领时间' },
      { name: '认领单位' },
      { name: '操作人' },
      { name: '操作人电话' },
      { name: '认领状态' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'gatewayId' },
      { type: 'text', name: 'serialNum' },
      { type: 'time', name: 'bindDate' },
      { type: 'text', name: 'orgName' },
      { type: 'text', name: 'operatorName' },
      { type: 'text', name: 'operatorPhone' },
      { type: 'text', name: 'claim' }
    ];

    this.dataSet = [];
    this.dataSetOrg = [];
    this.total = 0;
    this.totalOrg = 0;
  }

  ngOnInit(): void {
    this.getData();
    // this.getOrg()
  }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  getData() {
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize
    };
    this.apiService.getbindHistory(data).then(response => {
      if (response && response.data) {
        console.log(response);
        response.data.forEach((element: any) => {
          element.centerName = '杭州城西运营中心';
          element.name = '张三';
          element.phone = '15158288888';
          if (!element.failReason) {
            element.claim = '认领成功';
          } else if (element.failReason) {
            element.claim = '认领失败';
          }
          this.apiService.findById(element.gatewayId).then(response => {
            console.log(response);
            element.bindDate = response.data.bindDate;
            element.serialNum = response.data.serialNum;
            element.bindDate = response.data.bindDate;
            element.bindDate = response.data.bindDate;
            if (response.data.orgId) {
              this.apiService.findOrgById(response.data.orgId).then(response => {
                console.log(response);
                element.orgName = response.data.orgName;
              });
            }
          });
        });

        this.dataSet = response.data;
        this.total = response.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  editFun(event: any) {
    this.editItem = event;
    if (event.btnIndex == 1) {
      this.isVisible = true;
    }
  }
  turnPage(event: object) {}

  searchOrg() {
    this.pageIndexOrg = 0;
    this.getOrg();
  }

  getOrg() {
    let data = {
      page: this.pageIndexOrg - 1,
      size: this.pageSizeOrg,
      nameLike: undefined
    };

    if (!this.searchVal) {
      delete data.nameLike;
    }

    this.apiService.getOrgList(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any) => {
          element.centerName = '杭州城西运营中心';
          element.name = '张三';
          element.phone = '15158288888';
          if (element.serveEndTime > new Date().getTime()) {
            element.serveStatus = '服务中';
          } else {
            element.serveStatus = '已过期';
          }
        });
        this.dataSetOrg = response.data.content;
        this.totalOrg = response.totalElements; //总条数
      } else {
        this.dataSetOrg = [];
        this.totalOrg = 0; //总条数
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.apiService.bindGateway({ id: this.editItem.id, orgId: this.orgItem.id }).then(response => {
      this.isVisible = false;
      if (response && response.success) {
        this.msg.success('操作成功');
        this.getData();
        this.getOrg();
      } else {
        this.msg.error('操作失败');
      }
    });
  }

  checkedItemFun(item: any) {
    this.orgItem = item;
    if (item.checked) {
      this.dataSetOrg.forEach((element: any) => {
        if (item.id != element.id) {
          element.disabled = true;
        }
      });
    } else {
      this.dataSetOrg.forEach((element: any) => {
        if (item.id != element.id) {
          element.disabled = false;
        }
      });
    }
  }
}
