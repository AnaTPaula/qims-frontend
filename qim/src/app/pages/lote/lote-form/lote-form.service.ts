import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Lote } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoteFormService {

  url = environment.apiUrl + '/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getLote(id: number, empresaId: number): Observable<Lote> {
    return this.httpClient.get<Lote>(this.url + empresaId + '/lote/' + id,{ headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getLotesByNome(empresaId: number, nome: string): Observable<Lote[]> {
    let params = new HttpParams().set('codigo_lote', nome);
    return this.httpClient.get<Lote[]>(this.url + empresaId + '/lote', { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createLote(lote: Lote): Observable<Lote> {
    return this.httpClient.post<Lote>(this.url + lote.empresaId + '/lote', JSON.stringify(lote), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateLote(lote: Lote): Observable<Lote> {
    return this.httpClient.put<Lote>(this.url + lote.empresaId + '/lote/' + lote.id, JSON.stringify(lote), this.getOptions(this.cookieService.get('token')))
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
