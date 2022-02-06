import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';
import { RealTimeMapRoutingModule } from './real-time-map-routing.module';
import { RealTimeMapMapComponent } from './map/map.component';
import { G2CardModule } from '@delon/chart/card';
import { G2TimelineModule } from '@delon/chart/timeline';
const COMPONENTS: Type<void>[] = [RealTimeMapMapComponent];

@NgModule({
  imports: [SharedModule, RealTimeMapRoutingModule, G2CardModule, G2TimelineModule],
  declarations: COMPONENTS
})
export class RealTimeMapModule {}
