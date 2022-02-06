import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealTimeMapMapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: RealTimeMapMapComponent },
  { path: 'map', component: RealTimeMapMapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealTimeMapRoutingModule {}
