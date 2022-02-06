import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

@Component({
  selector: 'app-setting-dictionaries',
  templateUrl: './dictionaries.component.html'
})
export class SettingDictionariesComponent implements OnInit {
  charactarMap: any;
  dataSet: any;
  keyNameList: any;
  teadList: any;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  charactarList: any;
  dictionaries: any;
  isVisible = false;
  operationMap: any;
  dataSetRiskSource: any;
  pageIndexRiskSource = 1;
  pageSizeRiskSource = 10;
  isVisibleRiskSource = false;
  keyNameList2: any;
  teadList2: any;
  typeIndex: any;
  teadList3: any;
  keyNameList3: any;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    public activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private enumService: EnumService,
    private msg: NzMessageService
  ) {
    this.typeIndex = 0;
    this.dictionaries = {};
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'unit' },
      { type: 'time', name: 'createTime' },
      { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];
    this.teadList = [{ name: '序号' }, { name: '名称' }, { name: '单位' }, { name: '创建时间' }, { name: '操作' }];

    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'level' },
      { type: 'time', name: 'createTime' },
      { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];

    this.teadList3 = [{ name: '序号' }, { name: '名称' }, { name: '等级' }, { name: '创建时间' }, { name: '操作' }];
    this.keyNameList3 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'level' },
      { type: 'time', name: 'createTime' },
      { type: 'buttonList', buttons: [{ text: '编辑', index: 1 }] }
    ];
    this.teadList2 = [{ name: '序号' }, { name: '名称' }, { name: '等级' }, { name: '创建时间' }, { name: '操作' }];

    this.operationMap = {};
  }

  // 角色查询
  charactarSearch() {
    this.apiService.charactarSearch().then(response => {
      if (response && response.data) {
        this.charactarList = response.data;
        this.charactarMap = this.enumService.getMap(response.data);
      }
    });
  }

  getOperationList() {
    this.apiService.getOperationList().then(response => {
      if (response && response.data) {
        this.operationMap = this.enumService.getMap(response.data);
      }
    });
  }

  ngOnInit(): void {
    this.charactarSearch();
    this.getOperationList();
    this.equipmentInfoFindAll();
    this.riskSourceFindAll();
  }

  editFun(item: any): void {
    console.log(item);
    this.dictionaries = JSON.parse(JSON.stringify(item));
    this.isVisible = true;
  }

  editFun2(item: any) {
    this.dictionaries = JSON.parse(JSON.stringify(item));
    this.isVisibleRiskSource = true;
  }

  add() {
    console.log(this.typeIndex);
    if (this.typeIndex == 0) {
      this.isVisible = true;
    } else {
      this.isVisibleRiskSource = true;
    }
  }

  // 设备列表字典
  equipmentInfoFindAll() {
    this.apiService.equipmentInfoFindAll().then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
        });
        this.dataSet = response.data;
      }
    });
  }
  // 风险源
  riskSourceFindAll() {
    this.apiService.riskSourceFindAll().then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
        });
        this.dataSetRiskSource = response.data;
      }
    });
  }

  handleOk() {
    if (this.dictionaries && this.dictionaries.id) {
      this.apiService.equipmentInfoUpdate(this.dictionaries).then(response => {
        if (response && response.data) {
          this.isVisible = false;
          this.dictionaries = {};
          this.ngOnInit();
          this.msg.success('操作成功');
        } else {
          this.isVisible = false;
          this.msg.error('操作失败');
        }
      });
    } else {
      this.apiService.equipmentInfoCreate(this.dictionaries).then(response => {
        if (response && response.data) {
          this.isVisible = false;
          this.dictionaries = {};
          this.ngOnInit();
          this.msg.success('操作成功');
        } else {
          this.isVisible = false;
          this.msg.error('操作失败');
        }
      });
    }
  }

  riskSourceOk() {
    if (this.dictionaries && this.dictionaries.id) {
      this.apiService.riskSourceUpdate(this.dictionaries).then(response => {
        if (response && response.data) {
          this.isVisibleRiskSource = false;
          this.dictionaries = {};
          this.ngOnInit();
          this.msg.success('操作成功');
        } else {
          this.isVisibleRiskSource = false;
          this.msg.error('操作失败');
        }
      });
    } else {
      this.apiService.riskSourceCreate(this.dictionaries).then(response => {
        if (response && response.data) {
          this.isVisibleRiskSource = false;
          this.dictionaries = {};
          this.ngOnInit();
          this.msg.success('操作成功');
        } else {
          this.isVisibleRiskSource = false;
          this.msg.error('操作失败');
        }
      });
    }
  }

  handleCancel() {
    this.isVisible = false;
    this.dictionaries = {};
  }

  riskSourceCancel() {
    this.isVisibleRiskSource = false;
    this.dictionaries = {};
  }
}
