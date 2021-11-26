import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  loginForm?: FormGroup;
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';

  constructor(private service: LoginService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm?.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm?.invalid) {
      return;
    }
    this.loading = true;
    this.service.login(this.f?.username.value, this.f?.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['home']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
