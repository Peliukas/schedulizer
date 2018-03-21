import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialog, MatSnackBar, MatChipList} from '@angular/material';
import {Schedule} from "../../models/schedule";
import {AddBreakComponent} from "../add-break/add-break.component";
import {ConfirmationBoxComponent} from "../confirmation-box/confirmation-box.component";
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.css']
})
export class ScheduleEditorComponent implements OnInit {

  @ViewChild('breakChips') chips: MatChipList;
  @Input() schedule: any;
  viewDate: Date = new Date();
  breakList: any[] = [];
  weekDayList: any[] = [];
  selectedWorkDayList: any[] = [];
  calendarWorkDays: any[] = [];
  selectMultipleDays: boolean = false;
  selectedCalendarDay: any = '';
  startTimeInputControl: FormControl;
  endTimeInputControl: FormControl;
  periodStartDateControl: FormControl;
  periodEndDateControl: FormControl;
  refresh: Subject<any> = new Subject();
  isHoliday: boolean = false;
  weekDaySelectionMode: boolean = false;

  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.startTimeInputControl = new FormControl();
    this.endTimeInputControl = new FormControl();
    this.periodStartDateControl= new FormControl();
    this.periodEndDateControl = new FormControl();
    this.getCalendarWorkDays();
    this.generateWeekDays();
  }

  public generateWeekDays(){
      this.weekDayList = [];
      this.weekDayList[0] = {
        weekDayName: 'Pir',
        selected: false
      }
      this.weekDayList[1] = {
        weekDayName: 'Ant',
        selected: false
      }
      this.weekDayList[2] = {
        weekDayName: 'Tre',
        selected: false
      }
      this.weekDayList[3] = {
        weekDayName: 'Ket',
        selected: false
      }
      this.weekDayList[4] = {
        weekDayName: 'Pen',
        selected: false
      }
      this.weekDayList[5] = {
        weekDayName: 'Še',
        selected: false
      }
      this.weekDayList[6] = {
        weekDayName: 'Se',
        selected: false
      }
  }

  public deleteSelectedSchedule() {
    console.log('deleting schedule');
    let schedule = new Schedule();
    schedule.find(this.schedule.doc._id)
      .then(data => {
        schedule.setValues(data);
        schedule.delete();
        let dialogRef = this.matDialog.open(ConfirmationBoxComponent);
        dialogRef.afterClosed()
          .subscribe(answer => {
            if (answer === true) {
              schedule.delete();
              this.snackBar.open("A schedule has been removed", "OK", {duration: 3000});
            }
          });
      });
  }


  public saveChanges() {
    let scheduleRef = new Schedule();
    scheduleRef.find(this.schedule.id)
      .then(data => {
        scheduleRef.data = data;
        scheduleRef.save() === true ?
          this.snackBar.open("Changes saved!", "OK", {duration: 3000}) :
          this.snackBar.open("Something went wrong", "OK", {duration: 3000});
        this.schedule.doc = scheduleRef.data;
        this.viewDate = new Date();
        this.getCalendarWorkDays();
      });
  }

  public nextMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  public previousMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  public dayClicked(day: any) {
    console.log(day);
    // this.getWeekNumber(day.date);
    if (this.selectMultipleDays) {
      this.addWorkDay(day.date);
    } else {
      if (day.events.length > 0) {
        this.setWorkDayInputFields(day);
      }
      else {
        this.resetSelection();
        this.selectedCalendarDay = day;
      }
    }
  }

  public addWorkDay(date: Date) {
    if (this.selectedWorkDayList.length < 1) {
      this.selectedWorkDayList = [
        {
          title: date,
          color: '',
          start: date
        }
      ];
    } else {
      for (let workDay of this.selectedWorkDayList) {
        if (workDay.title.getDate() === date.getDate()) {
          this.selectedWorkDayList.splice(this.selectedWorkDayList.indexOf(workDay), 1);
          return false;
        }
      }
      this.selectedWorkDayList.push({
        title: date,
        color: '',
        start: date
      });
      return true;
    }
  }

  public weekDayClicked(weekDay: any){
    console.log(weekDay);
    for(let i = 0; i < this.weekDayList.length; i++){
      if(this.weekDayList[i].weekDayName === weekDay.weekDayName){
        this.weekDayList[i].selected = !this.weekDayList[i].selected;
        return;
      }
    }
    console.log(this.weekDayList);
  }

  public setPeriod(startDate: Date, endDate: Date){

  }


  public saveWorkDayChanges() {
    let scheduleRef = new Schedule();
    scheduleRef.setValues(this.schedule.doc);
    let tempDay = {
      start_time: this.isHoliday ? '' : this.startTimeInputControl.value,
      end_time: this.isHoliday ? '' : this.endTimeInputControl.value,
      date: new Date(this.selectedCalendarDay.date),
      breaks: this.breakList,
      isHoliday: this.isHoliday
    };
    for (let i = 0; i < scheduleRef.data.work_days.length; i++ ) { //work day exists, set new values
      if (new Date(scheduleRef.data.work_days[i].date).getDate() === new Date(this.selectedCalendarDay.date).getDate()) {
        scheduleRef.data.work_days[i] = tempDay;
        scheduleRef.save();
        this.schedule.doc = scheduleRef.data;
        this.snackBar.open("Work day changes were saved!", "OK", {duration: 3000});
        this.getCalendarWorkDays();
        this.refresh.next();
        return true;
      }
    }
    this.schedule.doc.work_days.push(tempDay); //work day not found, pushing
    scheduleRef.setWorkDays(this.schedule.doc.work_days);
    scheduleRef.save();
    this.schedule.doc = scheduleRef.data;
    this.snackBar.open("New work day addded!", "OK", {duration: 3000});
    this.getCalendarWorkDays();
    this.refresh.next();
  }

  public saveScheduleChanges(workDayTime: any) {
    let scheduleRef = new Schedule();
    let tempWorkDayList = [];
    for (let selectedWorkDay of this.selectedWorkDayList) {
      tempWorkDayList.push({
        start_time: this.isHoliday ? '' : workDayTime.start_time,
        end_time: this.isHoliday ? '' : workDayTime.end_time,
        date: selectedWorkDay.start,
        breaks: this.isHoliday ? '' : this.breakList,
        isHoliday: this.isHoliday
      });
    }
    let uniqueWorkDays = tempWorkDayList.concat(this.schedule.doc.work_days.filter(function (item) {
      return tempWorkDayList.indexOf(item) < 0;
    }));
    scheduleRef.setValues(this.schedule.doc);
    scheduleRef.setWorkDays(uniqueWorkDays);
    scheduleRef.save();
    this.snackBar.open("Schedule changes were saved!", "OK", {duration: 3000});
    this.schedule.doc = scheduleRef.data;
    this.getCalendarWorkDays();
    this.refresh.next();
  }

  public openAddBreakWindow() {
    let dialogRef = this.matDialog.open(AddBreakComponent);
    dialogRef.afterClosed()
      .subscribe(data => {
        if(data){
          this.breakList.push(data);
          this.snackBar.open('Break has been added!', "OK", {duration: 3000});
        }
      });
  }

  public setWorkDayInputFields(day: any) {
    this.schedule.doc.work_days.forEach(scheduleWorkDay => {
      if (new Date(day.date).getDate() === new Date(scheduleWorkDay.date).getDate()) {
        if(scheduleWorkDay.isHoliday){
          this.startTimeInputControl.disable();
          this.endTimeInputControl.disable();
          this.resetSelection();
          this.isHoliday = true;
          this.selectedCalendarDay = day;
          return;
        }else{
          this.startTimeInputControl.enable();
          this.endTimeInputControl.enable();
          this.startTimeInputControl.setValue(scheduleWorkDay.start_time);
          this.endTimeInputControl.setValue(scheduleWorkDay.end_time);
          this.breakList = scheduleWorkDay.breaks;
          this.isHoliday = false;
          this.selectedCalendarDay = day;
          return;
        }
      }
    });
  }

  public getCalendarWorkDays() {
    let calendarWorkdays = [];
    console.log(this.schedule);
    for (let workDay of this.schedule.doc.work_days){
      if(workDay.isHoliday){
        calendarWorkdays.push({
          title: 'Išeiginė',
          start: new Date(workDay.date),
          color: ''
        });
      }else{
        calendarWorkdays.push({
          title: workDay.start_time + ' - ' + workDay.end_time,
          start: new Date(workDay.date),
          color: ''
        });
      }
    }
    this.calendarWorkDays = calendarWorkdays;
  }

  public clearCells() {
    let scheduleRef = new Schedule();
    scheduleRef.setValues(this.schedule.doc);
    if (this.selectMultipleDays) {
      for (let selectedWorkDay of this.selectedWorkDayList) {
        for (let workDay of scheduleRef.data.work_days) {
          if (new Date(workDay.date).getDate() === new Date(selectedWorkDay.start).getDate()) {
            scheduleRef.data.work_days.splice(scheduleRef.data.work_days.indexOf(workDay), 1);
          }
        }
      }
      this.schedule.doc = scheduleRef.data;
      scheduleRef.save();
      this.resetSelection();
      this.getCalendarWorkDays();
      this.refresh.next();
      this.snackBar.open("Cell cleared!", "OK", {duration: 3000});
    } else {
      if(this.selectedCalendarDay.events.length > 0){
        for (let workDay of scheduleRef.data.work_days) {
          if (new Date(workDay.date).getDate() === new Date(this.selectedCalendarDay.date).getDate()) {
            scheduleRef.data.work_days.splice(scheduleRef.data.work_days.indexOf(workDay), 1);
            scheduleRef.save();
            this.snackBar.open("Cell cleared!", "OK", {duration: 3000});
            this.resetSelection();
            this.schedule.doc = scheduleRef.data;
            this.getCalendarWorkDays();
            this.refresh.next();
            return;
          }
        }
      }
    }
  }

  public resetSelection(){
    this.selectedCalendarDay = '';
    this.endTimeInputControl.reset();
    this.startTimeInputControl.reset();
    this.selectedWorkDayList = [];
    this.breakList = [];
    this.isHoliday = false;
  }


  public deleteBreak(breakStart: any, breakEnd: any){
    for(let i = 0; i < this.schedule.doc.work_days.length; i++){
      if (new Date(this.schedule.doc.work_days[i].date).getDate() === new Date(this.selectedCalendarDay.date).getDate()) {
        for(let j = 0; j < this.schedule.doc.work_days[i].breaks.length; j++){
          if(this.schedule.doc.work_days[i].breaks[j].start === breakStart && this.schedule.doc.work_days[i].breaks[j].end === breakEnd){
            this.schedule.doc.work_days[i].breaks.splice(j, 1);
            this.snackBar.open("Break deleted. Press Save to apply changes", "OK", {duration: 3000});
          }
        }
      }
    }
  }

}
