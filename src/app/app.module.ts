import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TarefaPageModule} from "./pages/tarefa-page/tarefa-page.module";
import {HttpClientModule} from "@angular/common/http";
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask
} from "ngx-mask";
import {DragDropModule} from "@angular/cdk/drag-drop";


const maskConfig: Partial<IConfig> = {validation: false}
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule,
    TarefaPageModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-br'},
    provideNgxMask(maskConfig),
    provideEnvironmentNgxMask(maskConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
