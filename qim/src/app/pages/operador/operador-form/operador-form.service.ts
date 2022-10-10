import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Operador } from '../model';

@Injectable({
  providedIn: 'root'
})
export class OperadorFormService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getOperador(empresaId: number, operadorId: number): Observable<Operador> {
    return this.httpClient.get<Operador>(this.url + empresaId + '/operador/' + operadorId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getOperadoresByNome(empresaId: number, nome: string): Observable<Operador[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Operador[]>(this.url + empresaId + '/operador', { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createOperador(operador: Operador): Observable<Operador> {
    return this.httpClient.post<Operador>(this.url + operador.empresaId + '/operador', JSON.stringify(operador), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateOperador(operador: Operador): Observable<Operador> {
    return this.httpClient.put<Operador>(this.url + operador.empresaId + '/operador/' + operador.id, JSON.stringify(operador), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  patchOperador(operador: Operador): Observable<Operador> {
    return this.httpClient.patch<Operador>(this.url + operador.empresaId + '/operador/' + operador.id, JSON.stringify(operador), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
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
