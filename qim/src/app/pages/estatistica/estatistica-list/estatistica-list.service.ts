import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Estatistica } from '../model';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaListService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getEstatistica(empresaId: number): Observable<Estatistica> {
    return this.httpClient.post<Estatistica>(this.url + empresaId + '/estatistica', {} ,{ headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  getOptions(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  };

}
