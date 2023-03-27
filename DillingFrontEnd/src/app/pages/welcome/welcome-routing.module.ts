import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: 'chart', component: WelcomeComponent },
  { path: '', component: WelcomeComponent },
  { path: 'addedit', component: ChartFormComponent },
  { path: 'eventlist', component: ChartDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
