import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Funcionario } from '../model';
import { FuncionarioListService } from './funcionario-list.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {
  empresaId: number | undefined;
  funcionarios: Funcionario[] = [];
  situacao: string | undefined;

  constructor(
    private funcionarioService: FuncionarioListService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getFuncionarios();
    this.situacao = this.cookieService.get('situacao');
  }

  getFuncionarios() {
    if (this.empresaId){
      this.funcionarioService.getFuncionarios(this.empresaId).subscribe((funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
      });
    }
  }

  convertDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("pt-br");
    } else {
      return '';
    }
  }

  convertAcesso(acesso: string) {
    if(acesso === 'total') {
      return 'Permissão Total';
    } else if (acesso === 'modificar') {
      return 'Permissão Alteração/Leitura';
    } else if (acesso === 'leitura') {
      return 'Permissão apenas Leitura';
    } else {
      return acesso;
    }
  }

  deleteFuncionario(funcionario: Funcionario) {
    const result$ = this.showConfirm(
      'Deletar Funcionário',
      'Tem certeza que deseja deletar o(a) funcionário(a) ' + funcionario.nomeUsuario + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.funcionarioService.deleteFuncionario(funcionario) : EMPTY)
      ).subscribe(() => {
        this.getFuncionarios();
      });
  }

  showConfirm(title: string, body: string, cancel: string, confirm: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;
    bsModalRef.content.cancel = cancel;
    bsModalRef.content.confirm = confirm;
    bsModalRef.content.buttomClass = 'btn-danger';
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

}
