import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';;
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SideNavComponent } from './shared/sidenav-menu/sidenav-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { AddCandidateDialogComponent } from './candidate/dialogs/add-candidate/add.dialog.component';
import { EditCandidateDialogComponent } from './candidate/dialogs/edit-candidate/edit.dialog.component';
import { DeleteCandidateDialogComponent } from './candidate/dialogs/delete-candidate/delete.dialog.component';
import { DataService } from './candidate/services/data.service';
import { HomeComponent } from './home/home.component';
import { BenefitListComponent } from './benefit/benefit-list.component';
import { AddBenefitDialogComponent } from './benefit/dialogs/add/add.dialog.component';
import { DeleteBenefitDialogComponent } from './benefit/dialogs/delete/delete.dialog.component';
import { EditBenefitDialogComponent } from './benefit/dialogs/edit/edit.dialog.component';
import { DepartmentListComponent } from './department/department-list.component';
import { AddDepartmentDialogComponent } from './department/dialogs/add/add.dialog.component';
import { DeleteDepartmentDialogComponent } from './department/dialogs/delete/delete.dialog.component';
import { EditDepartmentDialogComponent } from './department/dialogs/edit/edit.dialog.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { AddEmployeeDialogComponent } from './employee/dialogs/add/add.dialog.component';
import { DeleteEmployeeDialogComponent } from './employee/dialogs/delete/delete.dialog.component';
import { EditEmployeeDialogComponent } from './employee/dialogs/edit/edit.dialog.component';
import { UserListComponent } from './user/user-list.component';
import { AddUserDialogComponent } from './user/dialogs/add/add.dialog.component';
import { DeleteUserDialogComponent } from './user/dialogs/delete/delete.dialog.component';
import { EditUserDialogComponent } from './user/dialogs/edit/edit.dialog.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // TODO: verificar pq o angular não está reconhecendo os componentes do Material Design
  declarations: [
    AppComponent,
    LoginScreenComponent,
    InitialPageComponent,
    ResetPasswordComponent,
    SideNavComponent,
    HomeComponent,
    CandidateListComponent,
    AddCandidateDialogComponent,
    EditCandidateDialogComponent,
    DeleteCandidateDialogComponent,
    BenefitListComponent,
    AddBenefitDialogComponent,
    DeleteBenefitDialogComponent,
    EditBenefitDialogComponent,
    DepartmentListComponent,
    AddDepartmentDialogComponent,
    DeleteDepartmentDialogComponent,
    EditDepartmentDialogComponent,
    EmployeeListComponent,
    AddEmployeeDialogComponent,
    DeleteEmployeeDialogComponent,
    EditEmployeeDialogComponent,
    UserListComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    EditUserDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [
    AddCandidateDialogComponent,
    EditCandidateDialogComponent,
    DeleteCandidateDialogComponent
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
