import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Operador } from '../model';
import { OperadorFormService } from './operador-form.service';

@Component({
  selector: 'app-operador-form',
  templateUrl: './operador-form.component.html',
  styleUrls: ['./operador-form.component.css']
})
export class OperadorFormComponent implements OnInit {
  empresaId: number | undefined;
  operadorId: number | undefined;
  operador = {} as Operador;
  viewPassword: boolean = false;
  requestFailed: boolean = false;
  requestSuccess: boolean = false;
  tipoUsuario: string = '';
  errorMsg: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operadorService: OperadorFormService,
    private cookieService: CookieService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.operadorId = params['id'];
    } ,(error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
    this.tipoUsuario = this.cookieService.get('tipo')
    if( this.empresaId && this.operadorId && this.tipoUsuario !== 'operador') {
      this.operadorService.getOperador(this.empresaId, this.operadorId).subscribe((operador: Operador) => {
        this.operador = operador;
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
    });
    } else {
      this.operador.tipoAcesso = 'total'
    }
  }

  save() {
    if(this.tipoUsuario !== 'operador'){
      if(this.operador.id) {
        const operadorForUpdate = {
          'id': this.operador.id,
          'nomeUsuario': this.operador.nomeUsuario,
          'senha': this.operador.senha,
          'tipoAcesso': this.operador.tipoAcesso,
          'empresaId': this.operador.empresaId
        } as Operador;
        this.operadorService.updateOperador(operadorForUpdate).subscribe(() => {
          this.requestSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/empresa/' + this.empresaId + '/operadores'])
          },
            2000);
        }, (error: any) => {
          this.requestFailed = true;
          this.errorMsg = error;
        })
      } else {
        const operadorForCreate = {
          'nomeUsuario': this.operador.nomeUsuario,
          'senha': this.operador.senha,
          'tipoAcesso': this.operador.tipoAcesso,
          'empresaId': this.empresaId
        } as Operador;
        this.operadorService.createOperador(operadorForCreate).subscribe(() => {
          this.requestSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/empresa/' + this.empresaId + '/operadores'])
          },
            2000);
        }, (error: any) => {
          this.requestFailed = true;
          this.errorMsg = error;
      })
      }
    } else{
      const operadorForUpdate = {
        'id': this.operadorId,
        'senha': this.operador.senha,
        'empresaId': this.empresaId
      } as Operador;
      this.operadorService.patchOperador(operadorForUpdate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/produtos'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
    })
      
    }
  }

  showPassword(){
    this.viewPassword = !this.viewPassword;
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }


}
