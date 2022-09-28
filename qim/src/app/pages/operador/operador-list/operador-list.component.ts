import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Operador } from '../model';
import { OperadorListService } from './operador-list.service';

@Component({
  selector: 'app-operador-list',
  templateUrl: './operador-list.component.html',
  styleUrls: ['./operador-list.component.css']
})
export class OperadorListComponent implements OnInit {
  empresaId: number | undefined;
  operadores: Operador[] = [];
  situacao: string | undefined;

  constructor(
    private operadorService: OperadorListService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getOperadores();
    this.situacao = this.cookieService.get('situacao');
  }

  getOperadores() {
    if (this.empresaId){
      this.operadorService.getOperadores(this.empresaId).subscribe((operadores: Operador[]) => {
        this.operadores= operadores;
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

  convertAcesso(tipoAcesso: string) {
    if(tipoAcesso === 'total') {
      return 'Permissão Total';
    } else if (tipoAcesso === 'modificar') {
      return 'Permissão Alteração/Leitura';
    } else if (tipoAcesso === 'leitura') {
      return 'Permissão apenas Leitura';
    } else {
      return tipoAcesso;
    }
  }

  deleteOperador(operador: Operador) {
    const result$ = this.showConfirm(
      'Deletar Operador',
      'Tem certeza que deseja deletar o(a) operador(a) ' + operador.nomeUsuario + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.operadorService.deleteOperador(operador) : EMPTY)
      ).subscribe(() => {
        this.getOperadores();
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
