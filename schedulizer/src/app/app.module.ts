import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatMenuModule, MatButtonModule, MatCardModule, MatTabsModule,
  MatTableModule, MatPaginatorModule, MatInputModule, MatSnackBarModule, MatSortModule, MatCheckboxModule,
  MatSelectModule, MatFormFieldModule, MatSidenavModule, MatGridListModule, MatListModule, MatExpansionModule,
  MatTooltipModule, MatSlideToggleModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StorageAdapterService } from './services/storage-adapter.service';

import { SidebarWrapperComponent } from './components/sidebar-wrapper/sidebar-wrapper.component';
import { PageContentWrapperComponent } from './components/page-content-wrapper/page-content-wrapper.component';
import { CrudWindowComponent } from './components/crud-window/crud-window.component';
import { CalendarWrapperComponent } from './components/calendar-wrapper/calendar-wrapper.component';
import { EmployeesMainComponent } from './views/employees-main/employees-main.component';
import { SchedulesMainComponent } from './views/schedules-main/schedules-main.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
import {PositionsMainComponent} from "./views/positions-main/positions-main.component";
import { ModelListViewComponent } from './views/model-list-view/model-list-view.component';


const routes: Routes = [
  { path: 'calendar', component: CalendarWrapperComponent },
  { path: 'schedules', component: SchedulesMainComponent },
  { path: 'employees', component: EmployeesMainComponent },
  { path: 'positions', component: PositionsMainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarWrapperComponent,
    PageContentWrapperComponent,
    CrudWindowComponent,
    CalendarWrapperComponent,
    EmployeesMainComponent,
    SchedulesMainComponent,
    ConfirmationBoxComponent,
    PositionsMainComponent,
    ModelListViewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule, MatMenuModule, MatButtonModule, MatCardModule, MatTabsModule,
    MatTableModule, MatPaginatorModule, MatInputModule, MatSnackBarModule, MatSortModule, MatCheckboxModule,
    MatSelectModule, MatFormFieldModule, MatSidenavModule, MatGridListModule, MatListModule, MatExpansionModule,
    MatTooltipModule, MatSlideToggleModule
  ],
  providers: [StorageAdapterService],
  entryComponents: [CrudWindowComponent, ConfirmationBoxComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
