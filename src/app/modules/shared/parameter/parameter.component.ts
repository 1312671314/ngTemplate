import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/modules/app/services/api.service';

@Component({
  selector: 'parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent {
  // tableType;
  allChecked = false;
  indeterminate = false;
  displayData: any;
  @Input() title: any;
  @Input() statusList: any;
  @Input() tableType: any;
  @Input() theadList: any;
  @Input() total: any;
  @Input() pageIndex: any;
  @Input() pageSize: any;
  @Input() keyNameList: any;
  @Input() showPages: any;
  @Output() pageIndexOut = new EventEmitter();
  @Output() checkOut = new EventEmitter();
  @Output() editFuncOut = new EventEmitter();
  @Output() viewFuncOut = new EventEmitter();
  @Output() checkBoxOut = new EventEmitter();
  @Output() isVisibleOut = new EventEmitter();

  @Input() isVisible: boolean;
  constructor(private apiService: ApiService, private msg: NzMessageService) {
    this.tableType = this.tableType ? this.tableType : 'ajaxTable';
    this.isVisible = false;
    this.theadList = [{ name: '序号', type: 'index' }, { name: '参数名' }, { name: '参数值' }, { name: '上报时间' }];
    this.keyNameList = [
      { type: 'index', name: 'index' },
      { type: 'text', name: 'name' },
      { type: 'text', name: 'showValue' },
      { type: 'time', name: 'readTime' }
    ];
    this.title = this.title ? this.title : '实时数据';
  }

  // getFileList() {
  //   this.fileListOut.emit(this.fileList);
  // }

  statusCancel() {
    this.isVisible = false;
    this.isVisibleOut.emit(this.isVisible);
  }

  editFun(item: any, index = null) {
    item.btnIndex = index;
    this.editFuncOut.emit(item);
  }
}
