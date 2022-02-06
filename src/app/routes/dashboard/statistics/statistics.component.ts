import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard-statistics',
  templateUrl: './statistics.component.html',
})
export class DashboardStatisticsComponent implements OnInit {
  
  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit(): void { }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
