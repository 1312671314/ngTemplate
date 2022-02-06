import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RescuerListComponent } from './list/list.component';
import { RescuerAddComponent } from './add/add.component';
import { RescuerDetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: RescuerListComponent },
  { path: 'list', component: RescuerListComponent },
  { path: 'add', component: RescuerAddComponent },
  { path: 'detail/:id', component: RescuerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RescuerRoutingModule {}
