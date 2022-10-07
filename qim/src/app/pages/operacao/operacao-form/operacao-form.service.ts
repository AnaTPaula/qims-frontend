import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Operacao } from '../model';

@Injectable({
  providedIn: 'root'
})
export class OperacaoFormService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  createOperacao(operacao: Operacao): Observable<Operacao> {
    return this.httpClient.post<Operacao>(this.url + operacao.empresaId + '/estoque/alterar', JSON.stringify(operacao), this.getOptions(this.cookieService.get('token')))
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
