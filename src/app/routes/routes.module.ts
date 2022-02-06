import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';

import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Array<Type<null>> = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS]
})
export class RoutesModule {}
