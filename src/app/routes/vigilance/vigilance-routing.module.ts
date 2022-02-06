import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VigilanceVigilanceListComponent } from './vigilance-list/vigilance-list.component';
import { VigilanceHistoryComponent } from './history/history.component';
import { VigilanceRealTimeComponent } from './real-time/real-time.component';
import { VigilanceFaultComponent } from './fault/fault.component';
import { VigilanceRenewComponent } from './renew/renew.component';
import { VigilanceRealTimeDetailComponent } from './real-time-detail/real-time-detail.component';

const routes: Routes = [
  { path: '', component: VigilanceVigilanceListComponent },
  { path: 'vigilance-list', component: VigilanceVigilanceListComponent },
  { path: 'history', component: VigilanceHistoryComponent },
  { path: 'real-time', component: VigilanceRealTimeComponent },
  { path: 'fault', component: VigilanceFaultComponent },
  { path: 'renew', component: VigilanceRenewComponent },
  { path: 'real-time-detail', component: VigilanceRealTimeDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VigilanceRoutingModule { }
