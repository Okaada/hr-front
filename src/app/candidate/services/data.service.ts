import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateModel } from '../models/CandidateModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../services/base.service';

@Injectable()
export class DataService extends BaseService<any, string> {

  dataChange: BehaviorSubject<CandidateModel[]> = new BehaviorSubject<CandidateModel[]>([]);
  dialogData: any;
  token = localStorage.getItem('currentUser') || '';
  obj = JSON.parse(this.token);

  constructor(private httpClient: HttpClient) {
    super('/api/Candidate/', httpClient)
  }

  getCandidates(): Observable<any> {
    let auth = new HttpHeaders().set('Authorization', `Bearer ${this.obj.token}`);
    return this.get(`candidates`, { headers: auth })
  }

  updateCandidate(id: string, data: CandidateModel): Observable<any> {
    let auth = new HttpHeaders().set('Authorization', `Bearer ${this.obj.token}`);
    return this.put(id, data, `update`, { headers: auth })
  }

  deleteCandidate(id: string): Observable<any> {
    let auth = new HttpHeaders().set('Authorization', `Bearer ${this.obj.token}`);
    return this.delete(id, { headers: auth });
  }

  addCandidate(candidateModel: CandidateModel) {
    let auth = new HttpHeaders().set('Authorization', `Bearer ${this.obj.token}`);
    console.log(candidateModel, 'ser')
    return this.post(candidateModel, '', { headers: auth })
  }
}

