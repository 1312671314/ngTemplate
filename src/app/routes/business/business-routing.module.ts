import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessBusinessListComponent } from './business-list/business-list.component';
import { BusinessHistoryComponent } from './history/history.component';
import { BusinessBusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessBusinessAddComponent } from './business-add/business-add.component';
import { OutletComponent } from 'src/app/modules/shared/outlet/outlet.component';

const routes: Routes = [
  { path: '', component: BusinessBusinessListComponent },
  { path: 'detail/:id', component: BusinessBusinessDetailComponent },
  { path: 'add', component: BusinessBusinessAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
