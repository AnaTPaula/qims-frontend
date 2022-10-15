import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Estoque, EstoqueProduto } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstoqueListService {

  url = environment.apiUrl + '/empresa/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getEstoques(empresaId: number): Observable<Estoque[]> {
    return this.httpClient.get<Estoque[]>(this.url + empresaId + '/estoque', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getProdutoEstoque(estoque: Estoque): Observable<EstoqueProduto[]> {
    return this.httpClient.get<EstoqueProduto[]>(this.url + estoque.empresaId + '/estoque/' + estoque.id + '/produto', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteEstoque(Estoque: Estoque): Observable<Estoque> {
    return this.httpClient.delete<Estoque>(this.url + Estoque.empresaId + '/estoque/' + Estoque.id, this.getOptions(this.cookieService.get('token')))
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
