import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Almoxarifado } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AlmoxarifadoFormService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getAlmoxarifado(empresaId: number, almoxarifadoId: number): Observable<Almoxarifado> {
    return this.httpClient.get<Almoxarifado>(this.url + empresaId + '/almoxarifado/' + almoxarifadoId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getAlmoxarifadosByNome(empresaId: number, nome: string): Observable<Almoxarifado[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Almoxarifado[]>(this.url + empresaId + '/almoxarifado', { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createAlmoxarifado(almoxarifado: Almoxarifado): Observable<Almoxarifado> {
    return this.httpClient.post<Almoxarifado>(this.url + almoxarifado.empresaId + '/almoxarifado', JSON.stringify(almoxarifado), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateAlmoxarifado(almoxarifado: Almoxarifado): Observable<Almoxarifado> {
    return this.httpClient.put<Almoxarifado>(this.url + almoxarifado.empresaId + '/almoxarifado/' + almoxarifado.id, JSON.stringify(almoxarifado), this.getOptions(this.cookieService.get('token')))
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
