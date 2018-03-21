import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-wrapper',
  templateUrl: './sidebar-wrapper.component.html',
  styleUrls: ['./sidebar-wrapper.component.css']
})
export class SidebarWrapperComponent implements OnInit {


  @Output() onModelNameSelected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


}
