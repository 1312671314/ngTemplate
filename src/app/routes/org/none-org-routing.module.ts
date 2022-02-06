import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { OrgListComponent } from './org-list/org-list.component';
import { SharedOrgPageModule } from './shared-org-page.module';

const routes: Routes = [
  { path: '', component: OrgListComponent },
  { path: 'detail/:id', component: OrgDetailComponent },
  { path: 'edit/:id', component: OrgEditComponent },
  { path: 'add', component: OrgAddComponent }
];

@NgModule({
  imports: [SharedOrgPageModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoneOrgRoutingModule {}
