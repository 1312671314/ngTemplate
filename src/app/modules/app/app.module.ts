/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
// #endregion
// #region global third module
import { BidiModule } from '@angular/cdk/bidi';
// register angular
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { default as ngLang } from '@angular/common/locales/zh';
import { APP_INITIALIZER, LOCALE_ID, NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleInterceptor } from '@delon/auth';
import { ALAIN_I18N_TOKEN, DELON_LOCALE, zh_CN as delonLang } from '@delon/theme';
import { zhCN as dateLang } from 'date-fns/locale';
import { NZ_DATE_LOCALE, NZ_I18N, zh_CN as zorroLang } from 'ng-zorro-antd/i18n';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
// #region default language
// 参考：https://ng-alain.com/docs/i18n
import { DefaultInterceptor, I18NService, StartupService } from 'src/app/modules/core';
// #endregion
// #region JSON Schema form (using @delon/form)
import { JsonSchemaModule } from 'src/app/modules/shared';
import { GlobalConfigModule } from '../../global-config.module';
import { RoutesModule } from '../../routes/routes.module';
import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { STWidgetModule } from '../shared/st-widget/st-widget.module';
// #endregion
import { AppComponent } from './pages/app.component';
import { ApiService } from './services/api.service';
import { EnumService } from './services/enum.serveice';
import { EventsService } from './services/events.service';
import { Global } from './services/global.service';
import { HttpHandler } from './services/httpHandler.service';
import { LocalStorage } from './services/localStorage.service';
import { NoticeService } from './services/notice.service';
import { SocketHandler } from './services/socket-handler.service';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang
};
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.date },
  { provide: DELON_LOCALE, useValue: LANG.delon }
];
// #endregion

// #region i18n services

const I18NSERVICE_PROVIDES = [{ provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }];

const GLOBAL_THIRD_MODULES: Array<Type<any>> = [BidiModule];

const FORM_MODULES = [JsonSchemaModule];

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];
export function StartupServiceFactory(startupService: StartupService): () => Observable<void> {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    STWidgetModule,
    NzNotificationModule,
    ...GLOBAL_THIRD_MODULES,
    ...FORM_MODULES
  ],
  providers: [
    HttpHandler,
    LocalStorage,
    ApiService,
    Global,
    EnumService,
    SocketHandler,
    EventsService,
    NoticeService,
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...I18NSERVICE_PROVIDES,
    ...APPINIT_PROVIDES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
