import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
  place: string;
  orgName: string;
  time: any;
  serialNum: any;
  vigilancetTimes: any;
  online: any;
  status: any;
  person: any;
}
@Component({
  selector: 'app-vigilance-vigilance-list',
  templateUrl: './vigilance-list.component.html'
})
export class VigilanceVigilanceListComponent implements OnInit {
  dataSet2 = [
    {
      place: '房间405',
      time: '2020-11-21 12:23:20',
      type: '警情',
      result: '误报',
      person: '张三'
    },
    {
      place: '房间402',
      time: '2021-02-23 12:23:20',
      type: '警情',
      result: '误报',
      person: '张三'
    },
    {
      place: '房间401',
      time: '2021-03-25 12:23:20',
      type: '警情',
      result: '误报',
      person: '张三'
    }
  ];
  orgName: any;
  typeName = '预警';
  thName = '警情';
  radioValue: any;
  style: any;
  dataSet: any;
  type = '-1';
  date: any;
  dateFormat = 'yyyy/MM/dd';
  statusList = ['已推短息', '打电话中', '结束', '确认中'];
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  isVisible: boolean;
  detailItem: any;

  constructor(private http: _HttpClient, private modal: ModalHelper) {
    this.isVisible = false;
    this.detailItem = {
      orgName: ''
    };
    this.dataSet = [];
    this.type = '-1';
    this.radioValue = '1';
    this.style = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
  }

  selectTab(str: any) {
    this.thName = str;
  }

  menuChange(str: any) {
    this.typeName = str;
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData = new Array(200).fill(0).map((_, index) => ({
      id: index,
      name: `无线烟感 ${index}`, //无线烟感,无线手报，
      age: 32,
      address: `London, Park Lane no. ${index}`,
      orgName: '丽人夜总会店' + index,
      place: '房间号' + index,
      time: '2021-08-23 15:02:01',
      status: this.statusList[index % 3], //处理状态
      person: '张三',
      online: '在线',
      vigilancetTimes: (index % 3) + 1,
      serialNum: 'zcw3501'
    }));
  }

  showItem(item: object) {
    this.isVisible = true;
    this.detailItem = item;
    console.log(item);
  }

  handleOk() {
    this.isVisible = false;
  }

  handleCancel() {
    this.isVisible = false;
  }
}
