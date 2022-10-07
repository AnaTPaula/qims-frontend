import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Estoque } from '../model';
import { EstoqueListService } from './estoque-list.service';

@Component({
  selector: 'app-estoque-list',
  templateUrl: './estoque-list.component.html',
  styleUrls: ['./estoque-list.component.css']
})
export class EstoqueListComponent implements OnInit {
  empresaId: number | undefined;
  estoques: Estoque[] = [];
  acesso: string | undefined;
  paginaAtual = 1;
  requestFailed: boolean = false;
 
  constructor(
    private estoqueService: EstoqueListService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getEstoques();
    this.acesso = this.cookieService.get('acesso');
  }

  getEstoques() {
    if (this.empresaId){
      this.estoqueService.getEstoques(this.empresaId).subscribe((estoques: Estoque[]) => {
        this.estoques = estoques;
      },(error: any) => {
        this.requestFailed = true;
      }
      );
    }
  }

  deleteEstoque(estoque: Estoque) {
    const result$ = this.showConfirm(
      'Deletar Estoque',
      'Tem certeza que deseja deletar o Estoque ' + estoque.nome + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.estoqueService.deleteEstoque(estoque) : EMPTY)
      ).subscribe(() => {
        this.getEstoques();
      },(error: any) => {
        this.requestFailed = true;
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

  checkError() {
    this.requestFailed = false;
  }

}
