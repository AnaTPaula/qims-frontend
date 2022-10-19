import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Lote } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoteListService {

  url = environment.apiUrl + '/empresa/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getLotes(empresaId: number): Observable<Lote[]> {
    return this.httpClient.get<Lote[]>(this.url + empresaId + '/lote', { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteLote(lote: Lote): Observable<Lote> {
    return this.httpClient.delete<Lote>(this.url + lote.empresaId + '/lote/' + lote.id, this.getOptions(this.cookieService.get('token')))
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
