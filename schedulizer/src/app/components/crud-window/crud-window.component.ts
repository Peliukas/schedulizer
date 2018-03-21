import {Component, Inject, Input, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {Position} from "../../models/position";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Schedule} from "../../models/schedule";

@Component({
  selector: 'app-crud-window',
  templateUrl: './crud-window.component.html',
  styleUrls: ['./crud-window.component.css']
})
export class CrudWindowComponent implements OnInit {

  modelName: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  dialogRef: MatDialogRef<CrudWindowComponent>) { }

  ngOnInit() {
    this.modelName = this.data.modelName;
  }

  public addObject(data: any){
    switch(this.modelName){
      case "employee":
        let employee = new Employee();
        employee.setValues(data);
        employee.save();
        this.dialogRef.close(employee);
      case "position":
        let position = new Position();
        position.setValues(data);
        position.save();
        this.dialogRef.close(position);
      case "schedule":
        let schedule = new Schedule();
        schedule.setValues(data);
        schedule.save();
        this.dialogRef.close(schedule);
    }
  }

  //TODO: check for ID dupes - add an increment on duplicate

}
