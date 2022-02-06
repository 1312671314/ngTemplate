import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingAccountComponent } from './account/account.component';
import { SettingRoleComponent } from './role/role.component';
import { SettingDictionariesComponent } from './dictionaries/dictionaries.component';
import { SettingOperationComponent } from './operation/operation.component';
import { SettingNoticeComponent } from './notice/notice.component';
import { SettingDiaryComponent } from './diary/diary.component';
import { SettingOperationAddComponent } from './operation-add/operation-add.component';
import { SettingPushComponent } from './push/push.component';
import { SettingMessageComponent } from './message/message.component';

const routes: Routes = [

  { path: 'account', component: SettingAccountComponent },
  { path: 'role', component: SettingRoleComponent },
  { path: 'dictionaries', component: SettingDictionariesComponent },
  { path: 'operation', component: SettingOperationComponent },
  { path: 'notice', component: SettingNoticeComponent },
  { path: 'diary', component: SettingDiaryComponent },
  { path: 'operation-add', component: SettingOperationAddComponent },
  { path: 'push', component: SettingPushComponent },
  { path: 'message', component: SettingMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
