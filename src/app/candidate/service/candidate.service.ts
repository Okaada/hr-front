import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AcaoService extends BaseService<any, number> {
  constructor(http: HttpClient) {
    super('/api/acao', http);
  }

  consultar(filtro: string): Observable<any> {
    return this.post(filtro, '/consultar');
  }
}
