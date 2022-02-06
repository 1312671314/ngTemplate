import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessBusinessListComponent } from './business-list/business-list.component';
import { BusinessHistoryComponent } from './history/history.component';
import { BusinessBusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessBusinessAddComponent } from './business-add/business-add.component';

const COMPONENTS: Type<void>[] = [
  BusinessBusinessListComponent,
  BusinessHistoryComponent,
  BusinessBusinessDetailComponent,
  BusinessBusinessAddComponent
];

@NgModule({
  imports: [SharedModule, BusinessRoutingModule],
  declarations: COMPONENTS
})
export class BusinessModule {}
