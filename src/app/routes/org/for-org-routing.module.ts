import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { SharedOrgPageModule } from './shared-org-page.module';

const routes: Routes = [
  { path: '', component: OrgDetailComponent },
  { path: 'edit', component: OrgEditComponent }
];

@NgModule({
  imports: [SharedOrgPageModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForOrgRoutingModule {}
