import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingAccountComponent } from './account/account.component';
import { SettingRoleComponent } from './role/role.component';
import { SettingDictionariesComponent } from './dictionaries/dictionaries.component';
import { SettingOperationComponent } from './operation/operation.component';
import { SettingNoticeComponent } from './notice/notice.component';
import { SettingDiaryComponent } from './diary/diary.component';
import { SettingOperationAddComponent } from './operation-add/operation-add.component';
import { SettingPushComponent } from './push/push.component';
import { SettingMessageComponent } from './message/message.component';

const COMPONENTS: Type<void>[] = [
  SettingAccountComponent,
  SettingRoleComponent,
  SettingDictionariesComponent,
  SettingOperationComponent,
  SettingNoticeComponent,
  SettingDiaryComponent,
  SettingOperationAddComponent,
  SettingPushComponent,
  SettingMessageComponent
];

@NgModule({
  imports: [SharedModule, SettingRoutingModule],
  declarations: COMPONENTS
})
export class SettingModule {}
