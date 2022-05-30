import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Empresa } from '../model';


@Injectable({
  providedIn: 'root'
})
export class EmpresaListService {

  url = 'http://localhost:8000/v1/empresa'

  constructor(private httpClient: HttpClient) { }

  getEmpresas (): Observable<Empresa[]>{

    return this.httpClient.get<Empresa[]>(this.url)
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
       errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(() => errorMessage);
  };
}
