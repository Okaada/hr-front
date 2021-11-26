import { Component } from '@angular/core';
import { LoginService } from './login-screen/login.service';
import { LoginDTO } from './login-screen/loginDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hr-system-front';

  currentUser: LoginDTO;

  constructor(private auth: LoginService) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }
}
