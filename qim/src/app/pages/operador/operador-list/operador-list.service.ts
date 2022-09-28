import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Operador } from '../model';

@Injectable({
  providedIn: 'root'
})
export class OperadorListService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getOperadores(empresaId: number): Observable<Operador[]> {
    return this.httpClient.get<Operador[]>(this.url + empresaId + '/operador', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteOperador(operador: Operador): Observable<Operador> {
    return this.httpClient.delete<Operador>(this.url + operador.empresaId + '/operador/' + operador.id, this.getOptions(this.cookieService.get('token')))
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
