import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private operadorService: OperadorFormService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.operadorId = params['id'];
    } ,(error: any) => {
      this.requestFailed = true;
    });
    if( this.empresaId && this.operadorId) {
      this.operadorService.getOperador(this.empresaId, this.operadorId).subscribe((operador: Operador) => {
        this.operador = operador;
      }, (error: any) => {
        this.requestFailed = true;
    });
    } else {
      this.operador.tipoAcesso = 'total'
    }
  }

  save() {
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
          1000);
      }, (error: any) => {
        this.requestFailed = true;
         
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
          1000);
      }, (error: any) => {
        this.requestFailed = true;
    })
    }
  }

  showPassword(){
    this.viewPassword = !this.viewPassword;
  }

  checkError() {
    this.requestFailed = false;
  }


}
