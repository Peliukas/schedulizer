import {Component, Inject, Input, OnInit} from '@angular/core';
import {Employee} from "../../models/employee";
import {Position} from "../../models/position";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Schedule} from "../../models/schedule";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-crud-window',
    templateUrl: './crud-window.component.html',
    styleUrls: ['./crud-window.component.css']
})
export class CrudWindowComponent implements OnInit {

    positionControl: FormControl = new FormControl();
    scheduleControl: FormControl = new FormControl();
    employeeFormControlGroup: FormGroup;
    positionFormControlGroup: FormGroup;
    scheduleFormControlGroup: FormGroup;
    positionList: any[] = [];
    scheduleList: any[] = [];

    modelName: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  dialogRef: MatDialogRef<CrudWindowComponent>) {
    }

    ngOnInit() {
        this.modelName = this.data.modelName;
        switch (this.modelName) {
            case 'employee':
                let employeeFormControls = {
                    '_id': new FormControl(''),
                    'firstname': new FormControl('', [Validators.required]),
                    'lastname': new FormControl('', [Validators.required]),
                    'work_hours_cap': new FormControl('', [Validators.required]),
                    'position_id': new FormControl(''),
                    'schedule_id': new FormControl(''),
                }
                this.employeeFormControlGroup = new FormGroup(employeeFormControls);
                this.getDropdownData();
                break;
            case 'position':
                let positionFormControls = {
                    '_id': new FormControl(''),
                    'job_title': new FormControl('', [Validators.required]),
                    'description': new FormControl(''),
                }
                this.positionFormControlGroup = new FormGroup(positionFormControls);
                break;
            case 'schedule':
                let scheduleFromControls = {
                    '_id': new FormControl(''),
                    'schedule_name': new FormControl('', [Validators.required]),
                    'schedule_description': new FormControl(''),
                };
                this.scheduleFormControlGroup = new FormGroup(scheduleFromControls);
                break;
        }
    }

    public addObject() {
        switch (this.modelName) {
            case "employee":
                this.employeeFormControlGroup.get('_id').setValue(this.employeeFormControlGroup.get('firstname').value + this.employeeFormControlGroup.get('lastname').value);
                if (this.positionControl.value) {
                    this.employeeFormControlGroup.get('position_id').setValue(this.positionControl.value);
                }
                if (this.scheduleControl.value) {
                    this.employeeFormControlGroup.get('schedule_id').setValue(this.scheduleControl.value);
                }
                let employee = new Employee();
                employee.setValues(this.employeeFormControlGroup.value);
                employee.save();
                this.dialogRef.close(employee);
                break;
            case "position":
                this.positionFormControlGroup.get('_id').setValue(this.positionFormControlGroup.get('job_title').value);
                let position = new Position();
                position.setValues(this.positionFormControlGroup.value);
                position.save();
                this.dialogRef.close(position);
                break;
            case "schedule":
                this.scheduleFormControlGroup.get('_id').setValue(this.scheduleFormControlGroup.get('schedule_name').value);
                let schedule = new Schedule();
                schedule.setValues(this.scheduleFormControlGroup.value);
                schedule.save();
                this.dialogRef.close(schedule);
                break;
            default:
                break;
        }
    }


    private getDropdownData() {
        let positionRef = new Position();
        let scheduleRef = new Schedule();
        positionRef.findAll()
            .then(data => {
                this.positionList = data.rows;
                console.log(this.positionList);
            });
        scheduleRef.findAll()
            .then(data => {
                this.scheduleList = data.rows;
                console.log(this.scheduleList);
            });
    }


}
