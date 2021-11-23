import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CandidateListComponent } from './candidate/candidate-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'login', component: LoginScreenComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'initial-page', component: InitialPageComponent },
    { path: 'candidate', component: CandidateListComponent },
    { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }