import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Almoxarifado } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AlmoxarifadoListService {

  url = 'http://localhost:8000/v1/empresa/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getAlmoxarifados(empresaId: number): Observable<Almoxarifado[]> {
    return this.httpClient.get<Almoxarifado[]>(this.url + empresaId + '/almoxarifado', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteAlmoxarifado(almoxarifado: Almoxarifado): Observable<Almoxarifado> {
    return this.httpClient.delete<Almoxarifado>(this.url + almoxarifado.empresaId + '/almoxarifado/' + almoxarifado.id, this.getOptions(this.cookieService.get('token')))
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
