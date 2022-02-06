import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';
import { OrgAddComponent } from './org-add/org-add.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { OrgListComponent } from './org-list/org-list.component';

const COMPONENTS: Type<void>[] = [OrgListComponent, OrgDetailComponent, OrgAddComponent, OrgEditComponent];

@NgModule({
  imports: [SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedOrgPageModule {}
