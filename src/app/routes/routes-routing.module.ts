import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { PreloadOptionalModules } from '@delon/theme';
import { environment } from '@env/environment';
import { LayoutBasicComponent } from '../modules/layout/basic/basic.component';

// layout
import { AuthGuard } from '../modules/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: {},
    children: [
      {
        path: '',
        redirectTo: 'platform',
        pathMatch: 'full'
      },
      {
        path: 'platform',
        loadChildren: () => import('../modules/platform/platform.module').then(m => m.PlatformModule),
        canActivate: [AuthGuard],
        data: { preload: true }
      },
      {
        path: 'operate',
        loadChildren: () => import('../modules/operate/operate.module').then(m => m.OperateModule),
        canActivate: [AuthGuard],
        data: { preload: true }
      },
      {
        path: 'org',
        loadChildren: () => import('../modules/org/org.module').then(m => m.OrgModule),
        canActivate: [AuthGuard],
        data: { preload: true }
      }
    ]
  },

  // Blak Layout 空白布局
  // {
  //   path: 'data-v',
  //   component: LayoutBlankComponent,
  //   children: [{ path: '', loadChildren: () => import('./data-v/data-v.module').then(m => m.DataVModule) }]
  // },
  // passport
  {
    path: 'passport',
    loadChildren: () => import('./passport/passport.module').then(m => m.PassportModule),
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    data: { preload: true }
  },
  // { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
  { path: '**', redirectTo: '' }
  // { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  providers: [PreloadOptionalModules],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadOptionalModules
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
