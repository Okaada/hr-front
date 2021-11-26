import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateModel } from '../models/CandidateModel';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { BaseService } from '../../services/base.service';

@Injectable()
export class DataService extends BaseService<any, string> {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<CandidateModel[]> = new BehaviorSubject<CandidateModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  candidateUrl = 'http://localhost:5000/api/Candidate/';
  token = localStorage.getItem('currentUser') || '';
  obj = JSON.parse(this.token);

  constructor(private httpClient: HttpClient) {
    super('/api/Candidate/', httpClient)
  }

  getCandidates(): Observable<any> {
    let auth = new HttpHeaders().set('Authorization', `Bearer ${this.obj.token}`);
    return this.get(`candidates`, { headers: auth })
  }

  getCandidatesById(id: string): Observable<any> {
    let auth = new HttpHeaders().set('Authorization', `Bearer ${this.obj.token}`);
    return this.get(`candidate/${id}`, { headers: auth })
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

  updateIssue(candidateModel: CandidateModel): void {
    this.dialogData = candidateModel;
  }

  deleteIssue(candidateModel: number): void {
    console.log(candidateModel);
  }
}



/* REAL LIFE CRUD Methods I've used in projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




