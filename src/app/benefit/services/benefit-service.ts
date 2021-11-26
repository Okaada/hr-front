import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BenefitModel } from '../models/benefit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class BenefitService extends BaseService<any, string> {
  dataChange: BehaviorSubject<BenefitModel[]> = new BehaviorSubject<
    BenefitModel[]
  >([]);
  dialogData: any;
  token = localStorage.getItem('currentUser') || '';
  obj = JSON.parse(this.token);

  constructor(private httpClient: HttpClient) {
    super('/api/Benefits/', httpClient);
  }

  getBenefits(): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.get(``, { headers: auth });
  }

  updateBenefit(id: number, data: BenefitModel): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.put(id, data, `update`, { headers: auth });
  }

  deleteBenefit(id: number): Observable<any> {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.delete(id, { headers: auth });
  }

  addBenefit(body: BenefitModel) {
    let auth = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.obj.token}`
    );
    return this.post(body, 'create', { headers: auth });
  }
}
