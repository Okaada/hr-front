import { Component, Inject, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetService } from './reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loginForm?: FormGroup;

  constructor(private router: Router, @Inject(ResetService) private service: ResetService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    console.log(this.loginForm)
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }


  get f() { return this.loginForm?.controls; }

  onSubmit() {
    if (this.loginForm?.invalid) {
      return;
    }
    this.service.sendEmail(this.f?.email.value).subscribe();
  }

}
