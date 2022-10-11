import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { ListModalComponent } from 'src/app/shared/list-modal/list-modal.component';
import { Produto, ProdutoEstoque } from '../model';
import { ProdutoListService } from './produto-list.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  empresaId: number | undefined;
  produtos: Produto[] = [];
  acesso: string | undefined;
  paginaAtual = 1;
  requestFailed: boolean = false;

  constructor(
    private produtoService: ProdutoListService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getProdutos();
    this.acesso = this.cookieService.get('acesso');
  }

  getProdutos() {
    if (this.empresaId){
      this.produtoService.getProdutos(this.empresaId).subscribe((produtos: Produto[]) => {
        this.produtos = produtos;
      },(error: any) => {
        this.requestFailed = true;
      });
    }
  }

  deleteProduto(produto: Produto) {
    const result$ = this.showConfirm(
      'Deletar Produto',
      'Tem certeza que deseja deletar o Produto ' + produto.nome + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.produtoService.deleteProduto(produto) : EMPTY)
      ).subscribe(() => {
        this.getProdutos();
      }, (error: any) => {
        this.requestFailed = true;
    });
  }

  mostrarProdutoPorEstoque(produto: Produto) {
    let produtoEstoques: ProdutoEstoque[] = [];
    let headers = ['Estoque', 'Quantidade'];
    this.produtoService.getProdutoEstoque(produto).subscribe((entity: ProdutoEstoque[]) => {
      let items = []
      produtoEstoques = entity;
      for(let o of produtoEstoques) {
        items.push([o.nomeEstoque, o.quantidade]);
      }
      this.showList(
        'Estoques do produto',
        headers,
        items);
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

  showList(title: string, headers: string[], items: object[]) {
    const bsModalRef: BsModalRef = this.modalService.show(ListModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.headers = headers;
    bsModalRef.content.items = items;
    return (<ListModalComponent>bsModalRef.content);
  }

  checkError() {
    this.requestFailed = false;
  }
}
