import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from "../../models/schedule";
import {Employee} from "../../models/employee";
import {Position} from "../../models/position";
import {ConfirmationBoxComponent} from "../confirmation-box/confirmation-box.component";
import {MatDialog, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent implements OnInit {

  @Input() employee: any;
  @Input() bulkActions: any;

  scheduleList: any = '';
  positionList: any = '';

  positionRef: Position = new Position();
  scheduleRef: Schedule = new Schedule();

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPositionList();
    this.getScheduleList();
  }


  public deleteSelectedEmployee(id: any) {
    let employee = new Employee();
    employee.find(id)
      .then(data => {
        employee.setValues(data);
        let dialogRef = this.matDialog.open(ConfirmationBoxComponent);
        dialogRef.afterClosed()
          .subscribe(answer => {
            if (answer === true) {
              employee.delete();
              this.snackBar.open("An employee has been removed", "OK", {duration: 3000});
            }
          });
      });
  }

  public getScheduleList(){
    this.scheduleRef.findAll()
      .then(data => {
        this.scheduleList = data.rows;
      });
  }

  public saveChanges(changes: any) {
    let employee = new Employee();
    employee.find(changes._id).then(data => {
      employee.data = changes;
      employee.save() === true ?
        this.snackBar.open("Changes saved!", "OK", {duration: 3000}) :
        this.snackBar.open("Something went wrong", "OK", {duration: 3000});
    });
  }

  public getPositionList(){
    this.positionRef.findAll()
      .then(data => {
        this.positionList = data.rows;
      });
  }


}
