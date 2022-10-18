import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Empresa } from '../model';
import { EmpresaFormService } from './empresa-form.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { switchMap, take, EMPTY } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { TextModalComponent } from 'src/app/shared/text-modal/text-modal.component';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  empresaId: number | undefined;
  empresa = {} as Empresa;
  viewPassword: boolean = false;
  requestFailed: boolean = false;
  requestSuccess: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private empresaService: EmpresaFormService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['id']);
    if( this.empresaId) {
      this.empresaService.getEmpresa(this.empresaId).subscribe((empresa: Empresa) => {
        this.empresa = empresa;
      },(error: any) => {
        this.requestFailed = true;
      });
    } else {
      this.empresa.tipoArmazenagem = 'FIFO';
    }
  }

  save() {
    if(this.empresa.id) {
      const empresaForUpdate = {
        'id': this.empresa.id,
        'nomeUsuario': this.empresa.nomeUsuario,
        'senha': this.empresa.senha,
        'razaoSocial': this.empresa.razaoSocial
      } as Empresa;
      this.empresaService.updateEmpresa(empresaForUpdate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          if (this.cookieService.get('tipo') === 'administrador'){
            this.router.navigate(['/admin/empresas'])
          } else{
            this.router.navigate(['/empresa/'+ this.empresaId +'/operadores'])
          }
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
      })
    } else {
      const empresaForCreate = {
        'nomeUsuario': this.empresa.nomeUsuario,
        'senha': this.empresa.senha,
        'razaoSocial': this.empresa.razaoSocial,
        'tipoArmazenagem': this.empresa.tipoArmazenagem,
        'aceiteTermosUso': this.empresa.aceiteTermosUso
      } as Empresa;
      this.empresaService.createEmpresa(empresaForCreate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/admin/empresas'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
    })
    }
  }

  isLogado() {
    return this.cookieService.get('token');
  } 

  showPassword(){
    this.viewPassword = !this.viewPassword;
  }

  isEmpresa(){
    if (this.empresaId){
      return true;
    }else{
      return false;
    }
  }

  checkError() {
    this.requestFailed = false;
  }

  cancelarConta() {
    const result$ = this.showConfirm(
      'Deletar Empresa',
      'Tem certeza que deseja deletar a empresa ' + this.empresa.nomeUsuario + '?',
      'Cancelar',
      'Deletar',
      'btn-danger');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.empresaService.deleteEmpresa(this.empresaId!) : EMPTY)
      ).subscribe(() => {
        this.cookieService.deleteAll('/');
        this.router.navigate(['/']);
      },(error: any) => {
        this.requestFailed = true;
      });
  }

  showConfirm(title: string, body: string, cancel: string, confirm: string, buttomClass: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;
    bsModalRef.content.cancel = cancel;
    bsModalRef.content.confirm = confirm;
    bsModalRef.content.buttomClass = buttomClass;
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

  mostrarTermos() {
    this.showTermos(
      'Termos de uso',
      'blablabla');
  }

  showTermos(title: string, text: string) {
    const bsModalRef: BsModalRef = this.modalService.show(TextModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.text = text;
    return (<TextModalComponent>bsModalRef.content);
  }

  
}
