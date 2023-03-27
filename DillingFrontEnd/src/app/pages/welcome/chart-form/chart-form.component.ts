import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  EventRequestDTO,
  EventsService,
} from 'src/app/shared/services/nswag/service-proxies';
import { EventHandlerServiceService } from '../Helpers/event-handler-service.service';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css'],
})
export class ChartFormComponent {
  eventForm!: UntypedFormGroup;
  isEditMode: boolean = false;
  private itemid: number = 0;
  @Output() newItemEvent = new EventEmitter();
  @Input() _item = new BehaviorSubject<any>('');
  submitForm(): void {
    if (this.eventForm.valid) {
      let formValue = this.eventForm.value;
      if (this.isEditMode) {
        formValue['id'] = this.itemid;
        formValue.id = this.dataapiSerivce.update(formValue).subscribe((e) => {
          this.aftersubmission();
        });
      } else {
        this.dataapiSerivce.post(formValue).subscribe((e) => {
          this.aftersubmission();
        });
      }
    }
  }
  private aftersubmission() {
    this.eventForm.reset();
    this.newItemEvent.emit();
  }
  constructor(
    private fb: UntypedFormBuilder,
    private dataapiSerivce: EventsService,
    private evenhdlerSrv: EventHandlerServiceService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventTitle: [null, [Validators.required]],
      start: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      end: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
    this.subscriptions();
    this._item.subscribe((e) => {
      this.eventForm.reset();
      this.eventForm.patchValue(e.item);
      this.itemid = e.isEditmode ? e.item.id : 0;
      this.isEditMode = e.isEditmode;
    });
  }

  private subscriptions(): void {
    this.evenhdlerSrv._formSaved.subscribe((e) => {
      this.submitForm();
    });
  }
}
