import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Funcionario } from '../model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioFormService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getFuncionario(empresaId: number, funcionarioId: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(this.url + empresaId + '/funcionario/' + funcionarioId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getFuncionariosByNome(empresaId: number, nome: string): Observable<Funcionario[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Funcionario[]>(this.url + empresaId + '/funcionario', { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.url + funcionario.empresaId + '/funcionario', JSON.stringify(funcionario), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(this.url + funcionario.empresaId + '/funcionario/' + funcionario.id, JSON.stringify(funcionario), this.getOptions(this.cookieService.get('token')))
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
