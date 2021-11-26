import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDTO } from './loginDTO';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private currentUserSubject: BehaviorSubject<LoginDTO>;
  public currentUser: Observable<LoginDTO>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginDTO>(JSON.parse(localStorage.getItem('currentUser') ||'{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  loginUrl = 'http://localhost:5000/api/Login';

  public get currentUserValue(): LoginDTO {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
  }
}


