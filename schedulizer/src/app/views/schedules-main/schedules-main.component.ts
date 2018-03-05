import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ConfirmationBoxComponent} from "../../components/confirmation-box/confirmation-box.component";
import {Schedule} from "../../models/schedule";
import {MatDialog, MatSnackBar, MatChipList} from '@angular/material';
import {CalendarEvent} from 'angular-calendar';
import {AddBreakComponent} from "../../components/add-break/add-break.component";

@Component({
  selector: 'app-schedules-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedules-main.component.html',
  styleUrls: ['./schedules-main.component.css']
})
export class SchedulesMainComponent implements OnInit {

  @Input() scheduleList: string;
  @Input() bulkActions: boolean;
  @ViewChild('breakChips') chips: MatChipList;
  viewDate: Date = new Date();
  breakList: any[] = [];
  workDayList: any[] = [];

  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  public deleteSelectedSchedule(id: any) {
    let schedule = new Schedule();
    schedule.find(id)
      .then(data => {
        schedule.setValues(data);
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


  public saveChanges(changes: any) {
    let schedule = new Schedule();
    schedule.setValues(changes);
    schedule.save() === true ?
      this.snackBar.open("Changes saved!", "OK", {duration: 3000}) :
      this.snackBar.open("Something went wrong", "OK", {duration: 3000});
  }

  public nextMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  public previousMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  public dayClicked(day: any) {
    console.log(day.date);
    this.addWorkDay(day.date);
  }

  public addWorkDay(date: Date) {
    if (this.workDayList.length < 1) {
      this.workDayList = [
        {
          title: date,
          color: '',
          start: date
        }
      ];
    } else {
      for(let workDay of this.workDayList){
        console.log(date);
        console.log(workDay.title);
        if(workDay.title.getDate() === date.getDate()){
          console.log('date found!');
          this.workDayList.splice(this.workDayList.indexOf(workDay), 1);
          this.viewDate = date;
          return;
        }
      }
      this.workDayList.push({
        title: date,
        color: '',
        start: date
      });
    }
    this.viewDate = date;
    console.log(this.workDayList);
  }

  public openAddBreakWindow(){
    let dialogRef = this.matDialog.open(AddBreakComponent);
     dialogRef.afterClosed()
      .subscribe(data => {
        this.breakList = [data];
        console.log(this.breakList);
      });
  }

}
