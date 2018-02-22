import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatCardModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StorageAdapterService } from './services/storage-adapter.service';

import { SidebarWrapperComponent } from './components/sidebar-wrapper/sidebar-wrapper.component';
import { PageContentWrapperComponent } from './components/page-content-wrapper/page-content-wrapper.component';
import { CrudWindowComponent } from './components/crud-window/crud-window.component';
import { CalendarWrapperComponent } from './components/calendar-wrapper/calendar-wrapper.component';
import { EmployeesMainComponent } from './views/employees-main/employees-main.component';
import { SchedulesMainComponent } from './views/schedules-main/schedules-main.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarWrapperComponent },
  { path: 'schedules', component: SchedulesMainComponent },
  { path: 'employees', component: EmployeesMainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarWrapperComponent,
    PageContentWrapperComponent,
    CrudWindowComponent,
    CalendarWrapperComponent,
    EmployeesMainComponent,
    SchedulesMainComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  providers: [StorageAdapterService],
  bootstrap: [AppComponent]
})

export class AppModule { }
