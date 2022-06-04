import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Funcionario } from '../model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioListService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getFuncionarios(empresaId: number): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.url + empresaId + '/funcionario', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.delete<Funcionario>(this.url + funcionario.empresaId + '/funcionario/' + funcionario.id, this.getOptions(this.cookieService.get('token')))
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
