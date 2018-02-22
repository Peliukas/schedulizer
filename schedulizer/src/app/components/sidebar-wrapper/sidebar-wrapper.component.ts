import { Component, OnInit } from '@angular/core';
import { StorageAdapterService } from '../../services/storage-adapter.service';
import * as PouchDB from 'pouchdb'

@Component({
  selector: 'app-sidebar-wrapper',
  templateUrl: './sidebar-wrapper.component.html',
  styleUrls: ['./sidebar-wrapper.component.css']
})
export class SidebarWrapperComponent implements OnInit {

  sidebarOpen: boolean;

  constructor(private db: StorageAdapterService) { }

  ngOnInit() {
    this.sidebarOpen = true;
  }

  public addObjectToDB(){
    this.db.addObject();

  }

  public getObjectFromDB(){
    console.log(this.db.getObject());
  }
}
