import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Lote } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LoteListService {

  url = 'http://localhost:8000/v1/empresa/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getLotes(empresaId: number): Observable<Lote[]> {
    return this.httpClient.get<Lote[]>(this.url + empresaId + '/lote', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteLote(lote: Lote): Observable<Lote> {
    return this.httpClient.delete<Lote>(this.url + lote.empresaId + '/lote/' + lote.id, this.getOptions(this.cookieService.get('token')))
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