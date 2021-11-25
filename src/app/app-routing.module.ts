import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { HomeComponent } from './home/home.component';
import { BenefitListComponent } from './benefit/benefit-list.component';
import { DepartmentListComponent } from './department/department-list.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { UserListComponent } from './user/user-list.component';

const routes: Routes = [
    { path: 'benefit', component: BenefitListComponent },
    { path: 'candidate', component: CandidateListComponent },
    { path: 'department', component: DepartmentListComponent },
    { path: 'employee', component: EmployeeListComponent },
    { path: 'home', component: HomeComponent },
    { path: 'initial-page', component: InitialPageComponent },
    { path: 'login', component: LoginScreenComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'user', component: UserListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }