import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';

@Component({
  selector: 'app-operation-list',
  templateUrl: './list.component.html'
})
export class OperationListComponent implements OnInit {
  teadList: any;
  dataSet: any;
  total = 0;
  keyNameList: any;
  isVisible: boolean;
  pageSize: number;
  pageIndex: number;
  operation: any;
  locationConfig: any;
  location: any;
  editItem: any;
  isEdit: boolean;
  isVisibleAccountList = false;
  charactarList: any;
  charactarMap: any;
  pageIndex2 = 1;
  pageSize2 = 10;
  dataSet2: any;
  total2 = 0;
  teadList2: any;
  keyNameList2: any;
  editItem2: any;
  isVisibleAccount: any;
  editAccount: any;
  addAccount: any;
  addTitle = '';
  constructor(
    private global: Global,
    private router: Router,
    private modal: ModalHelper,
    private apiService: ApiService,
    private msg: NzMessageService,
    private enumService: EnumService,
    private activatedRoute: ActivatedRoute
  ) {
    this.addAccount = {};
    this.isEdit = false;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.isVisible = false;

    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'charactarName' },
      { type: 'text', name: 'phone' },
      { type: 'time', name: 'createTime' },
      { type: 'text', name: 'status' }
      // { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];
    this.teadList2 = [
      { name: '序号', type: 'index' },
      { name: '姓名' },
      { name: '角色' },
      { name: '手机号' },
      { name: '创建时间' },
      { name: '状态' }
      // { name: '操作' }
    ];

    this.teadList = [
      { name: '序号', type: 'index' },
      { name: '运营中心' },
      { name: '运营中心编号' },
      { name: '区域' },
      { name: '创建时间' },
      { name: '操作', widthSet: true }
    ];
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'serial' },
      { type: 'text', name: 'SSQ' },
      { type: 'time', name: 'createTime' },
      {
        type: 'buttonList',
        buttons: [
          { text: '编辑', index: 1 },
          { text: '账号', index: 2 },
          { text: '添加', index: 3 }
        ]
      }
    ];
    this.dataSet = [];
    this.locationConfig = Global.getCityConfig();
    this.location = {
      provinceId: -1
    };
    this.operation = {
      name: ''
    };
  }

  ngOnInit(): void {
    this.charactarSearch();
    this.getData();
  }

  add(): void {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  onLocationSelect(location: any) {
    this.location = location;
  }

  handleOk() {
    this.location.name = this.operation.name;
    if (!this.isEdit) {
      this.apiService.addOperation(this.location).then(response => {
        if (response && response.data) {
          this.isVisible = false;
          this.ngOnInit();
          this.msg.success('添加成功');
        } else {
          this.isVisible = false;
          this.msg.error('添加失败');
        }
      });
    } else {
      this.location.id = this.operation.id;
      this.apiService.updateOperation(this.location).then(response => {
        if (response && response.data) {
          this.isVisible = false;
          this.isEdit = false;
          this.ngOnInit();
          this.msg.success('编辑成功');
        } else {
          this.isVisible = false;
          this.msg.error('编辑失败');
        }
      });
    }
  }

  handleCancel() {
    this.isVisible = false;
    this.isEdit = false;
    this.operation.name = '';
    this.location = {
      provinceId: -1
    };
  }

  getData() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: any) => {
          element.index = index;
          element.SSQ = this.enumService.getSSQ(element.provinceId, element.cityId, element.districtId);
        });
        this.dataSet = response.data;
        // this.total = response.totalElements; //总条数
      } else {
        this.dataSet = [];
        this.total = 0; //总条数
      }
    });
  }

  editFun(item: any) {
    // 运营中心
    this.editItem2 = item;
    this.addTitle = this.editItem2.name + '-添加子账号';
    if (item.btnIndex == 1) {
      this.router.navigate(['detail', item.id], {
        relativeTo: this.activatedRoute
      });
    } else if (item.btnIndex == 2) {
      this.isVisibleAccountList = true;
      let data = { page: this.pageIndex2 - 1, size: this.pageSize2, operateId: item.id };
      this.getAccountList(data);
    } else {
      this.isVisibleAccount = true;
    }
  }

  editFun2(item: any) {}

  // 角色查询
  charactarSearch() {
    this.apiService.charactarSearch().then(response => {
      if (response && response.data) {
        let arr: any[] = [];
        response.data.forEach((element: any) => {
          if (element.category == 'OP') {
            arr.push(element);
          }
        });
        this.charactarList = arr;
        console.log(response.data);
        this.charactarMap = this.enumService.getMap(arr);
      }
    });
  }

  // 账号管理
  getAccountList(data: any) {
    this.apiService.getAccountList(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          element.index = index;
          element.charactarText = this.charactarMap[element.charactarId];
          element.status = element.deleted ? '禁用' : '正常';
        });
        this.dataSet2 = response.data.content;
        this.total2 = response.data.totalElements;
      }
    });
  }

  onCancel() {
    this.isVisibleAccountList = false;
  }

  turnPage(event: object) {}

  turnPage2(page: number) {
    this.pageIndex = page;
    let data = { page: this.pageIndex2 - 1, size: this.pageSize2, operateId: this.editItem2.id };
    this.getAccountList(data);
  }

  addCancel() {
    this.isVisibleAccount = false;
  }

  addOk() {
    this.addAccount.operateId = this.editItem2.id;
    if (!this.enumService.isMobile(this.addAccount.phone)) {
      this.msg.error('手机号格式错误');
      return;
    } else {
      this.apiService.createAccount(this.addAccount).then(response => {
        if (response && response.data) {
          this.isVisibleAccount = false;
          this.msg.success('添加成功');
        } else {
          this.isVisible = false;
          this.msg.error(response.message);
        }
      });
    }
  }
}
