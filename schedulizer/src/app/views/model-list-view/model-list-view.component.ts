import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {Position} from "../../models/position";
import {MatDialog, MatSnackBar} from '@angular/material';
import {CrudWindowComponent} from "../../components/crud-window/crud-window.component";
import {ConfirmationBoxComponent} from "../../components/confirmation-box/confirmation-box.component";


@Component({
  selector: 'app-model-list-view',
  templateUrl: './model-list-view.component.html',
  styleUrls: ['./model-list-view.component.css']
})
export class ModelListViewComponent implements OnInit {

  objectList: any;
  bulkActions: boolean;
  @Input() modelName: string;

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log(this.modelName);
    this.bulkActions = false;
    this.objectList = '';
    this.getObjectList();
  }

  public getObjectList() {
    switch (this.modelName) {
      case 'employee':
        new Employee().findAll()
          .then(data => {
            this.objectList = data.rows;
            console.log(data.rows);
          });
        break;
      case 'position':
        new Position().findAll()
          .then(data => {
            this.objectList = data.rows;
          });
    }

  }

  public showAddObjectModal() {
    let dialogRef = this.matDialog.open(CrudWindowComponent, {
      width: "310px",
      height: "auto",
      data: {
        modelName: this.modelName
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.data._id) {
        this.getObjectList();
        this.snackBar.open("New " + this.modelName + " added!", "OK", {duration: 3000});
      } else if (data && !data.data._id) {
        this.snackBar.open("An error occurred", "OK", {duration: 3000});
      }
    });
  }

  public deleteSelectedEmployee(id: any) {
    let model: any;
    switch (this.modelName) {
      case "employee":
        model = new Employee();
        break;
      case "position":
        model = new Position();
        break;
    }
    model.find(id)
      .then(data => {
        model.setValues(data);
        let dialogRef = this.matDialog.open(ConfirmationBoxComponent);
        dialogRef.afterClosed()
          .subscribe(answer => {
            if (answer === true) {
              model.delete();
              this.snackBar.open(this.modelName + " has been removed", "OK", {duration: 3000});
              let tempArray = [...this.objectList];
              for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].id === id) {
                  tempArray.splice(i, 1);
                  this.objectList = tempArray;
                }
              }
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


}
