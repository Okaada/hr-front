import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

export abstract class CrudService<T, ID>{
  protected base: string;
  protected http: HttpClient;
  protected options: {
    headers: HttpHeaders
  };

  constructor(
    base: string,
    http: HttpClient,
    options?: {
      headers: HttpHeaders
    }
  ) {
    this.base = this.getUrl(base);
    this.http = http;
    if (options === null || options === undefined) {
      this.options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    } else {
      this.options = options;
    }
  }

  getUrl(route: string): string {
    if (route.startsWith('/json/') || route.startsWith('/local/')) return route;

    let baseApi = environment.baseApi;

    if (baseApi.endsWith('/')) {
      baseApi = baseApi.substring(0, baseApi.length - 1);
    }
    if (!route.startsWith('/')) {
      route = `/{route}`;
    }
    return baseApi + route;
  }

  getFrontCurrentRootUrl(): string {
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  }

}
