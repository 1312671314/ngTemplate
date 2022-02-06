import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { RescuerRoutingModule } from './rescuer-routing.module';
import { RescuerListComponent } from './list/list.component';
import { RescuerAddComponent } from './add/add.component';
import { RescuerDetailComponent } from './detail/detail.component';

const COMPONENTS: Type<void>[] = [RescuerListComponent, RescuerAddComponent, RescuerDetailComponent];

@NgModule({
  imports: [SharedModule, RescuerRoutingModule],
  declarations: COMPONENTS
})
export class RescuerModule {}
