import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Produto, ProdutoEstoque } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoListService {

  url = environment.apiUrl + '/empresa/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getProdutos(empresaId: number): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.url + empresaId + '/produto', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getProdutoEstoque(produto: Produto): Observable<ProdutoEstoque[]> {
    return this.httpClient.get<ProdutoEstoque[]>(this.url + produto.empresaId + '/produto/' + produto.id + '/estoque', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.delete<Produto>(this.url + produto.empresaId + '/produto/' + produto.id, this.getOptions(this.cookieService.get('token')))
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
