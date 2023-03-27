import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptors } from './interceptors/http-interceptor';
import {
  API_BASE_URL,
  EventsService,
} from './shared/services/nswag/service-proxies';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Ng zoro
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    // Charts
    NgChartsModule,
  ],
  providers: [
    EventsService,
    { provide: 'API_BASE_URL', useFactory: getRemoteServiceBaseUrl },
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getRemoteServiceBaseUrl(): string {
  return environment.nSwagUrl;
}
