import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-calendar-free-day-settings',
    templateUrl: './calendar-free-day-settings.component.html',
    styleUrls: ['./calendar-free-day-settings.component.css']
})
export class CalendarFreeDaySettingsComponent implements OnInit {

    viewDate = new Date();
    calendarFreeDays = [];
    selectedCalendarDay = '';
    refresh: Subject<any> = new Subject();
    freeDayDateControl = new FormControl();

    constructor() {
    }

    ngOnInit() {
    }

    public nextMonth() {
        this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
    }

    public previousMonth() {
        this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
    }

}
