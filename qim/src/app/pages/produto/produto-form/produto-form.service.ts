import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Produto } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoFormService {

  url = 'http://localhost:8000/v1/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getProduto(produtoId: number, empresaId: number): Observable<Produto> {
    return this.httpClient.get<Produto>(this.url + empresaId + '/produto/' + produtoId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProdutosByNome(empresaId: number, nome: string): Observable<Produto[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Produto[]>(this.url + empresaId + '/produto', { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.url + produto.empresaId + '/produto', JSON.stringify(produto), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(this.url + produto.empresaId + '/produto/' + produto.id, JSON.stringify(produto), this.getOptions(this.cookieService.get('token')))
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
