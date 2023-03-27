import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { EventsService } from 'src/app/shared/services/nswag/service-proxies';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any = ['Data', 'Data'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: any = [
    { data: [50], label: 'Series A', stack: 'a' },
    { data: [50], label: 'Series C', stack: 'a' },
    { data: [50], label: 'Series D', stack: 'a' },
    { data: [60], label: 'Series E', stack: 'a' },
  ];

  constructor(private apiService: EventsService) {}

  ngOnInit() {
    this.apiService.chart().subscribe((e) => {
      this.barChartData = e;
    });
  }
}
