import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DepartmentModel } from '../models/department';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class DataService extends BaseService<any, string> {
  dataChange: BehaviorSubject<DepartmentModel[]> = new BehaviorSubject<
    DepartmentModel[]
  >([]);
  dialogData: any;
  token = localStorage.getItem('currentUser') || '';
  obj = JSON.parse(this.token);

  constructor(private httpClient: HttpClient) {
    super('/api/Department/', httpClient);
  }

  getDepartments(): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.get(`departments`, { headers: auth });
  }

  updateDepartment(id: number, data: DepartmentModel): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.put(id, data, `update`, { headers: auth });
  }

  deleteDepartment(id: number): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.delete(id, { headers: auth });
  }

  addDepartment(body: DepartmentModel) {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.post(body, '', { headers: auth });
  }
}
