import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Relatorio } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioListService {

  url = environment.apiUrl + '/empresa/'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

   getRelatorio(relatorio: Relatorio): Observable<any> {
    return this.httpClient.post(this.url + relatorio.empresaId + '/relatorio', relatorio, { headers: { 'token': this.cookieService.get('token') }, responseType: 'text'})
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  getOptions(token: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
        'token': token
      })
    }
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = '';
    } else {
      if (error.error.msg != undefined) {
        errorMessage = `${error.error.msg}`;
      } else {
        errorMessage = '';
      }
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  };

}
