import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { ProdutoFormService } from '../../produto/produto-form/produto-form.service';
import { ProdutoListService } from '../../produto/produto-list/produto-list.service';
import { Historico, Estorno } from '../model';
import { HistoricoListService } from './historico-list.service';

@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})
export class HistoricoListComponent implements OnInit {
  empresaId: number | undefined;
  produtoId: number | undefined;
  historico: Historico[] = [];
  paginaAtual = 1;
  requestFailed: boolean = false;
  errorMsg: string | undefined;
  nomeProduto: string | undefined;
  
  constructor(
    private historicoService: HistoricoListService,
    private produtoService: ProdutoFormService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.produtoId = params['produtoId'];
    });
    this.produtoService.getProduto(this.produtoId!, this.empresaId!).subscribe((produto)=>{
      this.nomeProduto = produto.nome;
    },(error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
    this.getHistorico();
  }

  getHistorico() {
    if (this.empresaId && this.produtoId){
      this.historicoService.getHistorico(this.empresaId, this.produtoId).subscribe((historico: Historico[]) => {
        this.historico= historico;
      },(error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
      });
    }
  }

  convertDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("pt-br")+ " " + new Date(timestamp * 1000).toLocaleTimeString("pt-br");
    } else {
      return '';
    }
  }

  reverseOperacao(entity: Historico) {
    const estorno = {
      'historicoId': entity.historicoId,
      'tipoOperacao': 'ESTORNO',
      'empresaId': this.empresaId
    } as Estorno;
    const result$ = this.showConfirm(
      'Estornar Operação',
      'Tem certeza que deseja estornar esta operação?',
      'Cancelar',
      'Estornar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.historicoService.createEstorno(estorno) : EMPTY)
      ).subscribe(() => {
        this.getHistorico();
      },(error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
      });
    
  }

  getOperacao(tipo: string) {
    if(tipo === 'TRANSFERENCIA') {
      return 'Transferência';
    } else if (tipo === 'SAIDA') {
      return 'Saída';
    } else if (tipo === 'ENTRADA') {
      return 'Entrada';
    }else if (tipo === 'ESTORNO_ENTRADA') {
      return 'Estorno de Entrada';
    } else if (tipo === 'ESTORNO_SAIDA') {
      return 'Estorno de Saída';
    } else {
      return tipo;
    }
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

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }

}
