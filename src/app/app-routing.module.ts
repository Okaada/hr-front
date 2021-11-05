import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { CandidatesViewComponent } from './candidates-view/candidates-view.component';

const routes: Routes = [
    { path: 'login', component: LoginScreenComponent },
    { path: 'initial-page', component: InitialPageComponent },
    { path: 'candidates-view', component: CandidatesViewComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }