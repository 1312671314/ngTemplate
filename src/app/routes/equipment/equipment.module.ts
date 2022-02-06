import { NgModule, Type } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentWirelessComponent } from './wireless/wireless.component';
import { EquipmentVideoComponent } from './video/video.component';
import { EquipmentApplianceComponent } from './appliance/appliance.component';
import { EquipmentTransmissionComponent } from './transmission/transmission.component';
import { EquipmentCardComponent } from './card/card.component';
import { EquipmentGasComponent } from './gas/gas.component';
import { EquipmentUnbindEquipmentComponent } from './unbind-equipment/unbind-equipment.component';
import { EquipmentHistoryComponent } from './history/history.component';
import { EquipmentWirelessDetailComponent } from './wireless-detail/wireless-detail.component';
import { EquipmentVideoDetailComponent } from './video-detail/video-detail.component';

const COMPONENTS: Type<void>[] = [
  EquipmentWirelessComponent,
  EquipmentVideoComponent,
  EquipmentApplianceComponent,
  EquipmentTransmissionComponent,
  EquipmentCardComponent,
  EquipmentGasComponent,
  EquipmentUnbindEquipmentComponent,
  EquipmentHistoryComponent,
  EquipmentWirelessDetailComponent,
  EquipmentVideoDetailComponent
];

@NgModule({
  imports: [SharedModule, EquipmentRoutingModule],
  declarations: COMPONENTS
})
export class EquipmentModule {}
