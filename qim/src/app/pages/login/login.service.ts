import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario } from './models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.apiUrl + '/login';

  constructor(private httpClient: HttpClient) { }

  login(usuario: Usuario): Observable<HttpResponse<Usuario>>{

    return this.httpClient.post<Usuario>(this.url, JSON.stringify(usuario), {headers: new HttpHeaders({'Content-Type': 'application/json'}),'observe': 'response'})
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
     if(error.error instanceof ErrorEvent){
        errorMessage = error.error.message;
     } else{
       errorMessage = `${error.error.msg}`;
     }
     console.log(errorMessage);
     return throwError(() => errorMessage);
  };
}
