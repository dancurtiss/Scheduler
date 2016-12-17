import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePickerComponent } from 'ng2-bootstrap/components/datepicker';
import * as moment from 'moment'

@Component({
    selector: 'my-datepicker',
    template: `
        <div class="form-group">
            <label>{{label}}</label>
            <div class="input-group col-md-6">
                <input type="text" [(ngModel)]="dateString" (ngModelChange)="dateStringChange($event)" class="form-control" (focus)="showPopup()" />
                <div class="input-group-addon" (click)="toggleCalendar()"><i class="fa fa-calendar"></i></div>
            </div>
        </div>
        <datepicker class="popup" *ngIf="showDatepicker" [(ngModel)]="dateModel" [showWeeks]="true" (ngModelChange)="dateModelChanged($event)" (selectionDone)="hidePopup($event)" ></datepicker>
  `,
    styles: [`
    .popup {
      position: absolute;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #ddd;
      height: 251px;
      z-index: 99;
    }
  `],
})
export class IsdDatepickerComponent {
    @Input()
    dateModel: Date;
    @Input()
    label: string;
    @Output()
    dateModelChange: EventEmitter<Date> = new EventEmitter();
    private showDatepicker: boolean = false;
    private dateString: string = null;

    ngOnInit(): void {
        this.dateString = this.dateModel ? moment(this.dateModel).format('MM/DD/YYYY') : null;
    }

    showPopup() {
        this.showDatepicker = true;
    }

    toggleCalendar() {
        this.showDatepicker = !this.showDatepicker;
    }

    dateStringChange($event: string) {
        var setDate = moment($event, 'MM/DD/YYYY');
        if (setDate.isValid()) {
            this.dateString = $event;
            this.dateModel = setDate.toDate();
            this.dateModelChange.emit(this.dateModel);
            this.showDatepicker = false;
        }
    }

    dateModelChanged($event: string) {
        this.dateString = this.dateModel ? moment(this.dateModel).format('MM/DD/YYYY') : null;
    }

    hidePopup(event) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event)
    }
}