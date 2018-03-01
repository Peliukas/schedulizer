import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {Position} from "../../models/position";
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmationBoxComponent} from "../../components/confirmation-box/confirmation-box.component";


@Component({
  selector: 'app-employees-main',
  templateUrl: './employees-main.component.html',
  styleUrls: ['./employees-main.component.css']
})
export class EmployeesMainComponent implements OnInit {


  @Input() employeeList: any;
  @Input() bulkActions: any;

  positionList: any = '';
  positionRef: Position = new Position();

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPositionList();
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


  public saveChanges(changes: any) {
    let employee = new Employee();
    employee.setValues(changes);
    employee.save() === true ?
      this.snackBar.open("Changes saved!", "OK", {duration: 3000}) :
      this.snackBar.open("Something went wrong", "OK", {duration: 3000});
  }

  public getPositionList(){
    this.positionRef.findAll()
      .then(data => {
        this.positionList = data;
        console.log(data);
      });
  }

}
