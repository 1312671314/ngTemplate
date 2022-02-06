import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OnboardingService } from '@delon/abc/onboarding';
import { G2PieComponent } from '@delon/chart/pie';
import { _HttpClient } from '@delon/theme';
import { ApiService } from 'src/app/modules/app/services/api.service';
import { EnumService } from 'src/app/modules/app/services/enum.serveice';
import { Chart } from '@antv/g2';
// import { dataSet } from '@antv/data-set';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardV1Component implements OnInit {
  @ViewChild('pie', { static: false })
  readonly pie!: G2PieComponent;
  todoData = [
    {
      completed: false,
      avatar: '6',
      name: 'Forever',
      content: `Walking through green fields ，sunshine in my eyes.`
    }
  ];

  webSite!: any[];
  salesData!: any[];
  offlineChartData!: any[];
  alamItem: any;
  faultItem: any;
  warnItem: any;
  deviceItem: any;
  list: any;
  alarmList: any;
  warnList: any;
  faultList!: any[];
  offlineList: any[];
  total = 0;
  smsPhoneList: any;
  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService, private cdf: ChangeDetectorRef) {
    this.alamItem = {
      count: 0,
      count1: 0
    };
    this.faultItem = {
      count: 0,
      count1: 0
    };
    this.warnItem = {
      count: 0,
      count1: 0
    };
    this.list = [];
    this.offlineList = [];
    // setTimeout(() => this.genOnboarding(), 1000);
  }

  ngOnInit(): void {
    this.offlineChartData = [{ time: 1629819221485, y1: 47, y2: 31, _time: 1629819220485 }];
    this.faultList = [{ time: 1629819221485, y1: 47, y2: 31, _time: 1629819220485 }];
    this.webEventFaultCurveForHome();
    this.webEventCurveForHome();
    this.webCurrentNumForHome();
    this.webEventOnlineCurveForHome();
    this.webSmsAndPhoneCurveForHome();

    this.salesData = [
      { x: '1月', y: 812 },
      { x: '2月', y: 726 },
      { x: '3月', y: 1122 },
      { x: '4月', y: 1128 },
      { x: '5月', y: 334 },
      { x: '6月', y: 438 },
      { x: '7月', y: 991 },
      { x: '8月', y: 924 },
      { x: '9月', y: 794 },
      { x: '10月', y: 751 },
      { x: '11月', y: 557 },
      { x: '12月', y: 339 }
    ];
    this.cdr.detectChanges();
    this.webSite = [
      { x: '2021-08-24', y: 7 },
      { x: '2021-08-25', y: 5 },
      { x: '2021-08-26', y: 4 },
      { x: '2021-08-27', y: 2 },
      { x: '2021-08-28', y: 4 },
      { x: '2021-08-29', y: 7 },
      { x: '2021-08-30', y: 5 },
      { x: '2021-08-31', y: 6 },
      { x: '2021-09-01', y: 5 },
      { x: '2021-09-02', y: 9 },
      { x: '2021-09-03', y: 6 },
      { x: '2021-09-04', y: 3 },
      { x: '2021-09-05', y: 1 },
      { x: '2021-09-06', y: 5 },
      { x: '2021-09-07', y: 3 },
      { x: '2021-09-08', y: 6 }
    ].slice(0, 10);
  }

  // 首页统计 当前告警预警 故障和 设备数量
  currentNumForHome() {
    this.apiService.currentNumForHome({}).then(response => {
      if (response && response.data) {
        console.log(response);
      } else {
      }
    });
  }

  // 首页统计 警情趋势（按月）
  eventCurveForHome() {
    this.apiService.eventCurveForHome({}).then(response => {
      if (response && response.data) {
        console.log(response);
      } else {
      }
    });
  }

  // 后台首页统计 当前事件数量和设备数量等
  webCurrentNumForHome() {
    this.apiService.webCurrentNumForHome({}).then(response => {
      if (response && response.data) {
        console.log(response);
        this.list = response.data;
        this.alamItem = response.data[0];
        this.warnItem = response.data[1];
        this.faultItem = response.data[2];
        this.deviceItem = response.data[3];
        this.cdf.markForCheck();
        this.cdf.detectChanges();
      } else {
      }
    });
  }

  webEventOnlineCurveForHome() {
    this.apiService.webDeviceOnlineCurveForHome({}).then(response => {
      if (response && response.data && response.data[0] && response.data[1]) {
        let total = Number(response.data[0].count + response.data[1].count);
        let percent1 = (response.data[0].count / total).toFixed(2);
        let percent2 = (response.data[1].count / total).toFixed(2);
        const data = [
          { item: '在线', count: response.data[0].count, percent: Number(percent1) },
          { item: '离线', count: response.data[1].count, percent: Number(percent2) }
        ];
        const chart = new Chart({
          container: 'offlineList',
          autoFit: true,
          height: 500
        });
        chart.coordinate('theta', {
          radius: 0.75
        });
        chart.data(data);
        chart.scale('percent', {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%';
            return val;
          }
        });
        chart.tooltip({
          showTitle: false,
          showMarkers: false
        });
        chart
          .interval()
          .position('percent')
          .color('item')
          .label('percent', {
            content: data => {
              return `${data.item}: ${(data.percent * 100).toFixed(0)}%`;
            }
          })
          .adjust('stack');
        chart.interaction('element-active');
        chart.render();
      } else {
        this.offlineList = [];
      }
    });
  }
  // 短息电话
  webSmsAndPhoneCurveForHome() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const yet = new Date(now.getTime() - 90 * 24 * 3600 * 1000);
    this.apiService
      .webSmsAndPhoneCurveForHome({
        queryDateStart: yet.getTime(),
        queryDateEnd: now.getTime() + 24 * 3600 * 1000
      })
      .then(response => {
        // this.smsPhoneList = response.data;
        console.log(response);
        let arr: any[] = [];
        let smslist = response.data[0].list;
        let phoneList = response.data[1].list;
        smslist.forEach((element: any) => {
          arr.push({ name: '短息', time: element.name, count: element.count });
        });
        phoneList.forEach((element: any) => {
          arr.push({ name: '电话', time: element.name, count: element.count });
        });
        // this.smsPhoneList = arr;
        const chart = new Chart({
          container: 'smsPhone',
          autoFit: true,
          height: 500
        });

        chart.data(arr);
        chart.tooltip({
          showMarkers: false,
          shared: true
        });

        chart
          .interval()
          .position('time*count')
          .color('name')
          .adjust([
            {
              type: 'dodge',
              marginRatio: 0
            }
          ]);
        chart.interaction('active-region');
        chart.render();
      });
  }

  // 后台首页警情趋势（按天）
  webEventCurveForHome() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const yet = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    this.apiService
      .webEventCurveForHome({
        firstReportTimeStart: yet.getTime(),
        firstReportTimeEnd: now.getTime() + 24 * 3600 * 1000
      })
      .then(response => {
        if (response && response.data && response.data.length == 2) {
          this.alarmList = [];
          this.warnList = [];
          let dateList: any = [];
          response.data[0].list.forEach((element: any) => {
            this.alarmList.push(element.count);
            dateList.push(element.name);
          });
          response.data[1].list.forEach((element: any) => {
            this.warnList.push(element.count);
          });
          type EChartsOption = echarts.EChartsOption;
          var chartDom = document.getElementById('offlineChartData')!;
          var myChart = echarts.init(chartDom);
          var option: EChartsOption;
          option = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['预警', '告警']
            },
            toolbox: {
              show: false,
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: dateList
              }
            ],
            yAxis: [
              {
                name: '条',
                type: 'value'
              }
            ],
            series: [
              {
                smooth: true,
                name: '预警',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: this.alarmList,
                itemStyle: {
                  color: '#FFC409'
                }
              },
              {
                smooth: true,
                name: '告警',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: this.warnList,
                itemStyle: {
                  color: '#EB445A'
                }
              }
            ]
          };

          option && myChart.setOption(option);
        }
      });
  }

  // 后台首页 故障趋势（按天）
  webEventFaultCurveForHome() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const yet = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    let list3: any = [];
    let list4: any = [];
    this.apiService
      .webEventFaultCurveForHome({
        firstReportTimeStart: yet.getTime(),
        firstReportTimeEnd: now.getTime() + 24 * 3600 * 1000
      })
      .then(response => {
        if (response && response.data && response.data.length == 3) {
          let list1 = response.data[0].list;
          let list2 = response.data[1].list;
          let dateList: any = [];
          response.data[0].list.forEach((element: any) => {
            list3.push(element.count);
            dateList.push(element.name);
          });
          response.data[1].list.forEach((element: any) => {
            list4.push(element.count);
          });
          type EChartsOption = echarts.EChartsOption;
          var chartDom = document.getElementById('faultList')!;
          var myChart = echarts.init(chartDom);
          var option: EChartsOption;
          option = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['欠压', '离线']
            },
            toolbox: {
              show: false,
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: dateList
              }
            ],
            yAxis: [
              {
                name: '条',
                type: 'value'
              }
            ],
            series: [
              {
                name: '欠压',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                smooth: true,
                data: list3
              },
              {
                smooth: true,
                name: '离线',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: list4
              }
            ]
          };

          option && myChart.setOption(option);
        }
      });
  }
}
