import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class ResetPassowrdModel {
    email: string = '';
    password: string = '';
    otp: string = '';
}

@Injectable()
export class ResetService {

    private currentUserSubject: BehaviorSubject<ResetPassowrdModel>;
    public currentUser: Observable<ResetPassowrdModel>;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<ResetPassowrdModel>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    loginUrl = 'http://localhost:5000/api/Login';

    sendEmail(email: string) {
        return this.http.post<any>(this.loginUrl + "/sentEmail", { email: email }).pipe(
            catchError((e: HttpErrorResponse) => {
                return throwError(e);
            })
        );;
    }

}


