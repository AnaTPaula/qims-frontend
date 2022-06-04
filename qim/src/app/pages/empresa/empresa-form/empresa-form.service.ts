import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Empresa } from '../model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaFormService {

  url = 'http://localhost:8000/v1/empresa'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getEmpresa(empresaId: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(this.url + '/' + empresaId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getEmpresasByNome(nome: string): Observable<Empresa[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Empresa[]>(this.url, { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.url, JSON.stringify(empresa), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.put<Empresa>(this.url + '/' + empresa.id, JSON.stringify(empresa), this.getOptions(this.cookieService.get('token')))
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
