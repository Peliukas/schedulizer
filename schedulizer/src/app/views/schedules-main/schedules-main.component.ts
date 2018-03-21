import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-schedules-main',
  templateUrl: './schedules-main.component.html',
  styleUrls: ['./schedules-main.component.css']
})
export class SchedulesMainComponent implements OnInit {

  @Input() scheduleList: any;
  @Input() bulkActions: boolean;


  constructor() {
  }

  ngOnInit() {

  }



}
