import { CrudService } from './crud.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class BaseService<T, ID> extends CrudService<T, ID> {
  constructor(baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
  }

  get(urlComplemento?: string, options?: { headers: HttpHeaders }) {
    options = this.resolveOptions(options);
    let complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.get(this.base + complemento, options).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  post(t: T, urlComplemento?: string, options?: { headers: HttpHeaders }) {
    options = this.resolveOptions(options);
    let complemento = urlComplemento !== undefined ? urlComplemento : '';

    return this.http.post(this.base + complemento, t, options).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  put(
    id: ID,
    t: T,
    urlComplemento?: string,
    options?: { headers: HttpHeaders }
  ) {
    options = this.resolveOptions(options);
    let complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.put(`${this.base}${complemento}/${id}`, t, options).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  patch(
    id: ID,
    t: T,
    urlComplemento?: string,
    options?: { headers: HttpHeaders }
  ) {
    options = this.resolveOptions(options);
    let complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.patch(`${this.base}${complemento}/${id}`, t, options).pipe(
      catchError((e: HttpErrorResponse) => {
        return throwError(e);
      })
    );
  }

  search(
    filter: T,
    urlComplemento?: string,
    options?: { headers: HttpHeaders }
  ) {
    options = this.resolveOptions(options);
    let complemento = urlComplemento ? urlComplemento : '';
    return this.http
      .post(`${this.base}${complemento}/consultar`, filter, this.options)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(e);
        })
      );
  }

  private resolveOptions(options: any) {
    if (options === null || options === undefined) {
      return this.options;
    }
    return options;
  }
}
