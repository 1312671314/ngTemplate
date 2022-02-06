import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('../../routes/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { preload: true }
  },
  {
    path: 'widgets',
    loadChildren: () => import('../../routes/widgets/widgets.module').then(m => m.WidgetsModule)
  },
  // { path: 'style', loadChildren: () => import('./style/style.module').then(m => m.StyleModule) },
  { path: 'delon', loadChildren: () => import('../../routes/delon/delon.module').then(m => m.DelonModule) },
  { path: 'extras', loadChildren: () => import('../../routes/extras/extras.module').then(m => m.ExtrasModule) },
  // { path: 'pro', loadChildren: () => import('./pro/pro.module').then(m => m.ProModule) },
  { path: 'vigilance', loadChildren: () => import('../../routes/vigilance/vigilance.module').then(m => m.VigilanceModule) },
  { path: 'equipment', loadChildren: () => import('../../routes/equipment/equipment.module').then(m => m.EquipmentModule) },
  { path: 'setting', loadChildren: () => import('../../routes/setting/setting.module').then(m => m.SettingModule) },
  { path: 'business', loadChildren: () => import('../../routes/business/business.module').then(m => m.BusinessModule) },
  { path: 'org', loadChildren: () => import('../../routes/org/none-org-routing.module').then(m => m.NoneOrgRoutingModule) },
  { path: 'real-time-map', loadChildren: () => import('../../routes/real-time-map/real-time-map.module').then(m => m.RealTimeMapModule) },
  { path: 'rescuer', loadChildren: () => import('../../routes/rescuer/rescuer.module').then(m => m.RescuerModule) },
  { path: 'operation', loadChildren: () => import('../../routes/operation/operation.module').then(m => m.OperationModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule {}
