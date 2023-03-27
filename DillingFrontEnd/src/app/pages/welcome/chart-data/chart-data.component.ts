import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  EventRequestDTO,
  EventsService,
} from 'src/app/shared/services/nswag/service-proxies';
import { EventHandlerServiceService } from '../Helpers/event-handler-service.service';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css'],
})
export class ChartDataComponent implements OnInit {
  constructor(
    private chartApiService: EventsService,
    private evenhdlerSrv: EventHandlerServiceService
  ) {}
  /// Data members
  isVisible = false;
  listOfData: EventRequestDTO[] = [];
  _item = new BehaviorSubject<any>('');
  _modelTitle = new BehaviorSubject<any>('');
  /// Data members ends
  ngOnInit(): void {
    this.onLoadData();
  }

  // Data handlers

  private onLoadData(): void {
    this.chartApiService.all().subscribe((x) => {
      console.log(x);
      this.listOfData = x;
    });
  }
  newItemEventAdded() {
    this.onLoadData();
    this.isVisible = false;
  }

  onUpdate(item: EventRequestDTO): void {
    this._modelTitle.next('Update');
    let payload = {
      item: item,
      isEditmode: true,
    };
    this._item.next(payload);
    this.isVisible = true;
  }

  // Data handlers ends

  /// model

  showModal(): void {
    this._modelTitle.next('Add');
    let payload = {
      item: {},
      isEditmode: false,
    };
    this._item.next(payload);
    this.isVisible = true;
  }

  handleOk(): void {
    this.evenhdlerSrv._formSaved.next(new Date());
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // Model ends
}
