import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';

@Component({
  selector: 'app-setting-notice',
  templateUrl: './notice.component.html'
})
export class SettingNoticeComponent implements OnInit {
  charactarMap: any;
  dataSet: any;
  keyNameList: any;
  teadList: any;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  pageIndex2 = 1;
  pageSize2 = 10;
  charactarList: any;
  account: any;
  isVisibleAdd = false;
  isVisibleEdit = false;
  operationMap: any;
  rule: any;
  typeList: any;
  operationList: any;
  editItem: any;
  dataSetRule: any;
  teadList2: any;
  keyNameList2: any;
  total2 = 0;
  messageTypeMap: any;
  isVisibleRule: any;
  ruleList: any;
  noticeList: any;
  noticeListAdd: any;
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    public activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private enumService: EnumService,
    private msg: NzMessageService
  ) {
    this.messageTypeMap = {
      FIRE_WARN: '预警',
      EVENT: '事件',
      FIRE_ALARM: '告警',
      DEVICE_FAULT: '故障'
    };
    this.account = {};
    this.keyNameList = [
      { type: 'index', name: 'index' },
      //   { type: 'text', name: 'operateInfoName' },
      //   { type: 'text', name: 'orgName' },
      { type: 'text', name: 'setName' },
      { type: 'text', name: 'typeName' },
      {
        type: 'buttonList',
        buttons: [
          { text: '编辑', index: 1 }
          //   { text: '删除', index: 2 }
        ]
      }
    ];
    this.teadList = [
      { name: '序号', type: 'index' },
      //   { name: '运营中心' },
      //   { name: '联网单位' },
      { name: '推送规则集' },
      { name: '规则类型' },
      { name: '操作' }
    ];

    this.teadList2 = [{ name: '序号' }, { name: '紧急联系人' }, { name: '通知渠道' }, { name: '消息类型' }, { name: '操作' }];
    this.keyNameList2 = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'levelName' },
      { type: 'text', name: 'hasText' },
      { type: 'text', name: 'messageTypeList' },
      {
        type: 'buttonList',
        buttons: [{ text: '编辑', index: 1 }]
      }
    ];
    this.operationMap = {};
    this.rule = {
      type: 0
    };

    this.typeList = [
      { val: '0', name: '系统默认' },
      { val: '1', name: '运营中心' }
    ];
    this.isVisibleRule = false;
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
    this.notifyRuleSearchSetList();
    this.charactarSearch();
    let [...noticeListAdd] = this.enumService.noticeList;
    this.noticeListAdd = noticeListAdd;
    this.noticeList = this.enumService.noticeList;
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

  searchLevel() {
    this.apiService.searchLevel({ setId: this.editItem.id }).then(response => {
      console.log(response);
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          element.messageTypeList = '';
          element.list.forEach((item: any) => {
            element.hasText = '';
            if (item.messageType) {
              element.messageTypeList += this.messageTypeMap[item.messageType];
            }

            if (item.hasPhone) {
              element.hasText += '电话/';
            }
            if (item.hasSMS) {
              element.hasText += '邮件/';
            }
            if (item.hasWebPush) {
              element.hasText += '网页推送/';
            }
            if (item.hasWeixin) {
              element.hasText += '微信推送';
            }
          });
          // if (element.hasPhone) {

          // }
        });
        if (response.data.length != 0) {
          this.dataSetRule = response.data;
        } else {
          this.dataSetRule = this.noticeList;
        }
        // this.dataSet = response.data;
      } else {
        this.dataSetRule = [];
      }
    });
  }

  editFun(item: any): void {
    console.log(item);
    this.editItem = item;
    this.isVisibleEdit = true;
    this.searchLevel();
  }

  editFun2(item: any) {
    console.log(item);
    this.ruleList = item;
    this.isVisibleRule = true;
  }

  add() {
    this.dataSetRule = this.noticeList;
    this.isVisibleAdd = true;
  }

  // 规则列表
  notifyRuleSearchSetList() {
    this.apiService.notifyRuleSearchSetList({}).then(response => {
      if (response && response.data) {
        response.data.forEach((element: any, index: number) => {
          element.index = index;
          if (element.operateId) {
            element.centerName = this.operationMap[element.operateId].name;
          }
          element.typeName = element.type ? '运营中心' : '系统默认';
          // element.setName = element.setList[0] ? element.setList[0].setName : '无';
        });
        this.dataSet = response.data;
      }
    });
  }

  handleOk() {
    // this.account.categoryList = ["PLATFORM"]
    this.apiService.createNotifyRuleSet(this.rule).then(response => {
      if (response && response.data) {
        // this.riskSourceAll = response.data
        // this.isVisibleAdd = false;
        // this.ngOnInit();
        // this.msg.success('添加成功');
        this.createRule(response.data);
      } else {
        this.isVisibleAdd = false;
        this.msg.error('添加失败');
      }
    });
  }
  createRule(data: any) {
    this.dataSetRule.forEach((element: any) => {
      element.type = this.editItem.type;
      element.operateInfoId = this.editItem.operateInfoId;
    });
    this.apiService.createLevel({ list: this.dataSetRule, setId: data.id }).then((response: any) => {
      if (response && response.data) {
        this.isVisibleEdit = false;
        this.ngOnInit();
        this.msg.success('添加成功');
        this.clearNotifyRule();
      } else {
        this.isVisibleEdit = false;
        this.msg.error('编辑失败');
      }
    });
  }

  editOk() {
    if (this.dataSetRule[0] && this.dataSetRule[0].setId) {
      let list: any[] = [];
      this.dataSetRule.forEach((element: any) => {
        element.list.forEach((item: any) => {
          list.push(item);
        });
      });
      this.apiService.updateLevel({ list: list }).then(response => {
        if (response && response.data) {
          this.isVisibleEdit = false;
          this.ngOnInit();
          this.msg.success('编辑成功');
          this.clearNotifyRule();
        } else {
          this.isVisibleEdit = false;
          this.msg.error('编辑失败');
        }
      });
    } else {
      // 创建集合
      this.dataSetRule.forEach((element: any) => {
        element.type = this.editItem.type;
        element.operateInfoId = this.editItem.operateInfoId;
      });

      this.apiService.createLevel({ list: this.dataSetRule, setId: this.editItem.id }).then((response: any) => {
        if (response && response.data) {
          this.isVisibleEdit = false;
          this.ngOnInit();
          this.msg.success('编辑成功');
          this.clearNotifyRule();
        } else {
          this.isVisibleEdit = false;
          this.msg.error('编辑失败');
        }
      });
    }
    //   修改集合名称
    this.updateSet();
  }

  clearNotifyRule() {
    this.apiService.clearNotifyRule().then(response => {
      if (response && response.success) {
        console.log('清楚规则缓存成功');
      } else {
        console.log('清楚规则缓存失败');
      }
    });
  }

  updateSet() {
    this.apiService.updateSet({ id: this.editItem.id, setName: this.editItem.setName }).then(response => {
      if (response && response.data) {
        this.ngOnInit();
      } else {
        this.msg.error('编辑集合名称失败');
      }
    });
  }

  editCancel() {
    this.isVisibleEdit = false;
  }

  handleCancel() {
    this.isVisibleAdd = false;
  }
}
