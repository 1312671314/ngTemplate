import { NgModule } from '@angular/core';
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
  { path: 'delon', loadChildren: () => import('../../routes/delon/delon.module').then(m => m.DelonModule) },
  { path: 'extras', loadChildren: () => import('../../routes/extras/extras.module').then(m => m.ExtrasModule) },
  { path: 'vigilance', loadChildren: () => import('../../routes/vigilance/vigilance.module').then(m => m.VigilanceModule) },
  { path: 'equipment', loadChildren: () => import('../../routes/equipment/equipment.module').then(m => m.EquipmentModule) },
  { path: 'setting', loadChildren: () => import('../../routes/setting/setting.module').then(m => m.SettingModule) },
  { path: 'business', loadChildren: () => import('../../routes/business/business.module').then(m => m.BusinessModule) },
  { path: 'org', loadChildren: () => import('../../routes/org/for-org-routing.module').then(m => m.ForOrgRoutingModule) },
  { path: 'real-time-map', loadChildren: () => import('../../routes/real-time-map/real-time-map.module').then(m => m.RealTimeMapModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule {}
