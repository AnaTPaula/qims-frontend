import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Adm } from '../model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmFormService {

  url = environment.apiUrl + '/admin'

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getAdm(admId: number): Observable<Adm> {
    return this.httpClient.get<Adm>(this.url + '/' + admId, { headers: { 'token': this.cookieService.get('token') } })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getAdmByNome(nome: string): Observable<Adm[]> {
    let params = new HttpParams().set('nome', nome);
    return this.httpClient.get<Adm[]>(this.url, { headers: { 'token': this.cookieService.get('token') }, params: params })
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createAdm(adm: Adm): Observable<Adm> {
    return this.httpClient.post<Adm>(this.url, JSON.stringify(adm), this.getOptions(this.cookieService.get('token')))
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateAdm(adm: Adm): Observable<Adm> {
    return this.httpClient.put<Adm>(this.url + '/' + adm.id, JSON.stringify(adm), this.getOptions(this.cookieService.get('token')))
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
