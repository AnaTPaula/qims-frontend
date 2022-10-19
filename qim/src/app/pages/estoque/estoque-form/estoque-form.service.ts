import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Estoque } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstoqueFormService {

  url = environment.apiUrl + '/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getEstoque(empresaId: number, EstoqueId: number): Observable<Estoque> {
    return this.httpClient.get<Estoque>(this.url + empresaId + '/estoque/' + EstoqueId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getEstoquesByNome(empresaId: number, nome: string): Observable<Estoque[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Estoque[]>(this.url + empresaId + '/estoque', { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createEstoque(Estoque: Estoque): Observable<Estoque> {
    return this.httpClient.post<Estoque>(this.url + Estoque.empresaId + '/estoque', JSON.stringify(Estoque), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateEstoque(Estoque: Estoque): Observable<Estoque> {
    return this.httpClient.put<Estoque>(this.url + Estoque.empresaId + '/estoque/' + Estoque.id, JSON.stringify(Estoque), this.getOptions(this.cookieService.get('token')))
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
      errorMessage = '';
    } else {
      if (error.error.msg != undefined){
        errorMessage = `${error.error.msg}`;
      } else {
        errorMessage = '';
      }
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  };
}
