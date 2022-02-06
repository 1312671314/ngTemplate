import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationListComponent } from './list/list.component';
import { OperationAddComponent } from './add/add.component';
import { OperationDetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: OperationListComponent },
  { path: 'list', component: OperationListComponent },
  { path: 'add', component: OperationAddComponent },
  { path: 'detail/:id', component: OperationDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule {}
