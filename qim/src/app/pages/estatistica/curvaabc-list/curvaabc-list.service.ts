import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CurvaAbc } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurvaAbcListService {

  url = environment.apiUrl + '/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getCurvaAbc(empresaId: number): Observable<CurvaAbc[]> {
    return this.httpClient.post<CurvaAbc[]>(this.url + empresaId + '/estatistica', {'tipo': 'curva'} ,{ headers: { 'token': this.cookieService.get('token')}})
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
