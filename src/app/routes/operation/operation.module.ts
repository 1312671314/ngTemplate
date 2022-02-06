import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationListComponent } from './list/list.component';
import { OperationAddComponent } from './add/add.component';
import { OperationDetailComponent } from './detail/detail.component';

const COMPONENTS: Type<void>[] = [
  OperationListComponent,
  OperationAddComponent,
  OperationDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    OperationRoutingModule
  ],
  declarations: COMPONENTS,
})
export class OperationModule { }
