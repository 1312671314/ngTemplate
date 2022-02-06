import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
@Component({
  selector: 'app-equipment-unbind-equipment',
  templateUrl: './unbind-equipment.component.html'
})
export class EquipmentUnbindEquipmentComponent implements OnInit {
  searchVal: any;
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
  reportOrgName: any;
  installerName: any;
  installerPhone: any;
  deviceTypeMap: any;
  constructor(private msg: NzMessageService, private apiService: ApiService, private enumService: EnumService) {
    this.searchVal = '';
    this.pageIndex = 1;
    this.pageSize = 10;
    this.pageSizeOrg = 10;
    this.pageIndexOrg = 1;
    this.isVisible = false;
    this.teadList = [
      { name: '网关编号' },
      { name: '网关类型' },
      { name: '网关型号' },
      { name: '点位数量' },
      { name: '上报安装单位' },
      { name: '安装人' },
      { name: '安装人电话' },
      { name: '首次接入日期' },
      { name: '通信状态' },
      { name: '认领状态' },
      { name: '操作' }
    ];
    this.keyNameList = [
      { type: 'text', name: 'serialNum' },
      { type: 'text', name: 'deviceType' },
      { type: 'text', name: 'deviceTypeName' },
      { type: 'text', name: 'sensorCount' },
      { type: 'text', name: 'reportOrgName' },
      { type: 'text', name: 'installerName' },
      { type: 'text', name: 'installerPhone' },
      { type: 'time', name: 'firstConnTime' },
      { type: 'text', name: 'offlineText' },
      { type: 'text', name: 'claim' },
      { type: 'buttonList', buttons: [{ text: '认领', index: 1 }] }
    ];

    this.dataSet = [];
    this.dataSetOrg = [];
    this.total = 0;
    this.totalOrg = 0;
  }

  // 设备类型
  findAllDeviceType() {
    this.apiService.findAllDeviceType().then(response => {
      if (response && response.data) {
        // this.deviceTypeList = response.data;
        this.deviceTypeMap = this.enumService.getMap(response.data);
        this.search();
      }
    });
  }

  ngOnInit(): void {
    this.findAllDeviceType();
    this.getOrg();
  }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  search() {
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      reportOrgName: this.reportOrgName,
      installerName: this.installerName,
      installerPhone: this.installerPhone
    };
    this.getData(data);
  }

  rest() {
    this.reportOrgName = '';
    this.installerName = '';
    this.installerPhone = '';
    let data = {
      page: this.pageIndex - 1,
      size: this.pageSize
    };
    this.getData(data);
  }

  getData(data: any) {
    data = this.apiService.filterData(data);
    this.apiService.getUnbindGateway(data).then(response => {
      if (response && response.data) {
        console.log(response);
        response.data.content.forEach((element: any) => {
          element.serialNum = this.enumService.getSerialNumAbbreviation(element.serialNum);
          element.deviceType = this.deviceTypeMap[element.typeId] ? this.deviceTypeMap[element.typeId].type : '';
          //类型
          element.deviceTypeName = this.deviceTypeMap[element.typeId] ? this.deviceTypeMap[element.typeId].typeName : '';
          element.offlineText = element.offline ? '离线' : '在线';
          if (element.orgId && !element.bindFailRemark) {
            element.claim = '已认领';
          } else if (!element.orgId && element.bindFailRemark) {
            element.claim = '认领失败';
          } else if (!element.orgId && !element.bindFailRemark) {
            element.claim = '未认领';
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

  editFun(event: any) {
    this.editItem = event;
    if (event.btnIndex == 1) {
      this.isVisible = true;
    }
  }
  turnPage(event: object) {}

  searchOrg() {
    this.pageIndexOrg = 1;
    this.getOrg();
  }

  getOrg() {
    let data = {
      page: this.pageIndexOrg - 1,
      size: this.pageSizeOrg,
      orgName: this.searchVal
    };

    if (!this.searchVal) {
      delete data.orgName;
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
        this.search();
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
