import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';

import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { LocationSelectComponent } from './location-select/location-select.component';
import { TableTemplateComponent } from './table-template/table-template.component';
import { FileUploadComponent } from './fileUpload/file-upload.component';
import { ParameterComponent } from './parameter/parameter.component';
import { OutletComponent } from './outlet/outlet.component';
import { MapLocationSelectPage } from './map-location-select/map-location-select.page';

// #region third libs
// import { NgxTinymceModule } from 'ngx-tinymce';
import { UEditorModule } from 'ngx-ueditor';
// NgxAmapModule.forRoot({
//   apiKey: 'f654b9eee4b2256ca910b46c300b389b'
// });
const THIRDMODULES: Array<Type<any>> = [UEditorModule];
// #endregion

// #region your componets & directives
const COMPONENTS: Array<Type<any>> = [
  LocationSelectComponent,
  TableTemplateComponent,
  FileUploadComponent,
  ParameterComponent,
  OutletComponent,
  MapLocationSelectPage
];
const DIRECTIVES: Array<Type<any>> = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    DelonFormModule,
    ...SHARED_DELON_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule {}
