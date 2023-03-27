import { NgModule } from '@angular/core';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
@NgModule({
  imports: [
    NzFormModule,
    FormsModule,
    NzTableModule,
    NzModalModule,
    NgChartsModule,
    NzButtonModule,
    ReactiveFormsModule,
    CommonModule,
    WelcomeRoutingModule,
    NzInputModule,
    NzGridModule,
  ],
  declarations: [WelcomeComponent, ChartFormComponent, ChartDataComponent],
  exports: [WelcomeComponent],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
  ],
})
export class WelcomeModule {}
