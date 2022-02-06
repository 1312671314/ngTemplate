import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';
import { VigilanceRoutingModule } from './vigilance-routing.module';
import { VigilanceVigilanceListComponent } from './vigilance-list/vigilance-list.component';
import { VigilanceHistoryComponent } from './history/history.component';
import { VigilanceRealTimeComponent } from './real-time/real-time.component';
import { VigilanceFaultComponent } from './fault/fault.component';
import { VigilanceRenewComponent } from './renew/renew.component';
import { VigilanceRealTimeDetailComponent } from './real-time-detail/real-time-detail.component';

const COMPONENTS: Type<void>[] = [
  VigilanceVigilanceListComponent,
  VigilanceHistoryComponent,
  VigilanceRealTimeComponent,
  VigilanceFaultComponent,
  VigilanceRenewComponent,
  VigilanceRealTimeDetailComponent
];

@NgModule({
  imports: [SharedModule, VigilanceRoutingModule],
  declarations: COMPONENTS
})
export class VigilanceModule {}
