import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Estatistica } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaListService {

  url = environment.apiUrl + '/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getEstatistica(empresaId: number): Observable<Estatistica> {
    return this.httpClient.post<Estatistica>(this.url + empresaId + '/estatistica', {} ,{ headers: { 'token': this.cookieService.get('token') } })
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
