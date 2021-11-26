import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { UserModel } from '../models/user';

@Injectable()
export class DataService extends BaseService<any, string> {
  dataChange: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >([]);
  dialogData: any;
  token = localStorage.getItem('currentUser') || '';
  obj = JSON.parse(this.token);

  constructor(private httpClient: HttpClient) {
    super('/api/User/', httpClient);
  }

  getUsers(): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.get(`users`, { headers: auth });
  }

  updateUsers(id: number, data: UserModel): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.put(id, data, `update`, { headers: auth });
  }

  deleteUsers(id: number): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.delete(id, { headers: auth });
  }

  addUsers(body: UserModel) {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.post(body, '', { headers: auth });
  }
}
