import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Global } from 'src/app/modules/app/services/global.service';

@Component({
  selector: 'app-setting-account',
  templateUrl: './account.component.html'
})
export class SettingAccountComponent implements OnInit {
  charactarMap: any;
  dataSet: any;
  keyNameList: any;
  teadList: any;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  charactarList: any;
  account: any;
  isVisible = false;
  isVisibleEdit: any;
  validateForm: FormGroup;
  editAccount: any;
  category: any;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    public activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private enumService: EnumService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private global: Global
  ) {
    this.validateForm = fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      charactarId: [null, [Validators.required]]
    });

    this.isVisibleEdit = false;
    this.account = {};
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'charactarName' },
      { type: 'text', name: 'phone' },
      { type: 'time', name: 'createTime' },
      { type: 'text', name: 'status' },
      { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];
    this.teadList = [
      { name: '序号', type: 'index' },
      { name: '姓名' },
      { name: '角色' },
      { name: '手机号' },
      { name: '创建时间' },
      { name: '状态' },
      { name: '操作' }
    ];
  }

  isEmptyInputValue(value: NzSafeAny): boolean {
    return value == null || value.length === 0;
  }

  // 角色查询
  // charactarSearch() {
  //   this.apiService.charactarSearch().then(response => {
  //     if (response && response.data) {
  //       this.charactarList = response.data;
  //       this.charactarMap = this.enumService.getMap(response.data);
  //     }
  //   });
  // }

  // 角色查询
  charactarSearch() {
    this.category = 'PLATFORM';
    switch (this.global.getUserInfo().category) {
      case 'ORG':
        this.category = 'ORG';
        break;
      case 'OP':
        this.category = 'OP';
        break;
    }
    this.apiService.charactarSearch().then(response => {
      if (response && response.data) {
        let arr: any[] = [];
        response.data.forEach((element: any) => {
          if (element.category == this.category) {
            arr.push(element);
          }
        });
        this.charactarList = arr;
        console.log(response.data);
        this.charactarMap = this.enumService.getMap(arr);
        this.getAccountList();
      }
    });
  }

  ngOnInit(): void {
    this.charactarSearch();
  }

  editFun(item: any): void {
    console.log(item);
    this.editAccount = JSON.parse(JSON.stringify(item));
    this.isVisibleEdit = true;
  }

  add() {
    this.isVisible = true;
  }

  turnPage(page: number) {
    this.pageIndex = page;
    this.getAccountList();
  }

  // 账号管理
  getAccountList() {
    let data: any = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      categoryList: [this.category]
    };
    switch (this.global.getUserInfo().category) {
      case 'ORG':
        data = { categoryList: [this.category], page: this.pageIndex - 1, size: this.pageSize, orgId: this.global.getUserInfo().orgId };
        break;
      case 'OP':
        data = {
          categoryList: [this.category],
          page: this.pageIndex - 1,
          size: this.pageSize,
          operateId: this.global.getUserInfo().operateId
        };
        break;
    }
    this.apiService.getAccountList(data).then(response => {
      if (response && response.data) {
        response.data.content.forEach((element: any, index: number) => {
          element.index = index;
          element.charactarText = this.charactarMap[element.charactarId];
          element.status = element.deleted ? '禁用' : '正常';
        });
        this.dataSet = response.data.content;
        this.total = response.data.totalElements;
      }
    });
  }

  handleOk() {
    if (!this.enumService.isMobile(this.account.phone)) {
      this.msg.error('手机号格式错误');
      return;
    } else {
      switch (this.global.getUserInfo().category) {
        case 'ORG':
          this.account.orgId = this.global.getUserInfo().orgId;
          break;
        case 'OP':
          this.account.operateId = this.global.getUserInfo().operateId;
          break;
      }
      this.apiService.createAccount(this.account).then(response => {
        if (response && response.data) {
          // this.riskSourceAll = response.data
          this.isVisible = false;
          this.ngOnInit();
          this.msg.success('添加成功');
          this.account = {};
        } else {
          this.isVisible = false;
          this.msg.error(response.message);
        }
      });
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  editOk() {
    this.apiService.accountUpdate({ id: this.editAccount.id, name: this.editAccount.name }).then(response => {
      if (response && response.data) {
        this.isVisibleEdit = false;
        this.ngOnInit();
        this.msg.success('编辑成功');
      } else {
        this.isVisibleEdit = false;
        this.msg.error(response.message);
      }
    });
  }
  editCancel() {
    this.isVisibleEdit = false;
  }
}
