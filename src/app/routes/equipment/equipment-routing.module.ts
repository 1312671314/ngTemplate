import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentWirelessComponent } from './wireless/wireless.component';
import { EquipmentVideoComponent } from './video/video.component';
import { EquipmentApplianceComponent } from './appliance/appliance.component';
import { EquipmentTransmissionComponent } from './transmission/transmission.component';
import { EquipmentCardComponent } from './card/card.component';
import { EquipmentGasComponent } from './gas/gas.component';
import { EquipmentUnbindEquipmentComponent } from './unbind-equipment/unbind-equipment.component';
import { EquipmentHistoryComponent } from './history/history.component';
import { EquipmentWirelessDetailComponent } from './wireless-detail/wireless-detail.component';
import { OutletComponent } from 'src/app/modules/shared/outlet/outlet.component';
import { EquipmentVideoDetailComponent } from './video-detail/video-detail.component';

const wirelessRoutes: Routes = [
  { path: '', component: EquipmentWirelessComponent },
  { path: 'detail/:deviceId', component: EquipmentWirelessDetailComponent }
];

const videoRoutes: Routes = [
  { path: '', component: EquipmentVideoComponent },
  { path: 'detail/:Id', component: EquipmentVideoDetailComponent }
];

const routes: Routes = [
  { path: 'wireless', component: OutletComponent, children: wirelessRoutes },
  { path: 'video', component: OutletComponent, children: videoRoutes },
  // { path: 'video', component: EquipmentVideoComponent },
  { path: 'appliance', component: EquipmentApplianceComponent },
  { path: 'transmission', component: EquipmentTransmissionComponent },
  { path: 'card', component: EquipmentCardComponent },
  { path: 'gas', component: EquipmentGasComponent },
  { path: 'unbindEquipment', component: EquipmentUnbindEquipmentComponent },
  { path: 'history', component: EquipmentHistoryComponent },
  { path: 'wireless-detail', component: EquipmentWirelessDetailComponent }
  // { path: 'video-detail', component: EquipmentVideoDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule {}
