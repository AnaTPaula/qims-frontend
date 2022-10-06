import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Produto } from '../../produto/model';
import { Estoque } from '../../estoque/model';
import { Lote } from '../../lote/model';
import { Operacao } from '../model';
import { OperacaoFormService } from './operacao-form.service';
import { LoteFormService } from '../../lote/lote-form/lote-form.service';
import { ProdutoListService } from '../../produto/produto-list/produto-list.service';
import { EstoqueListService } from '../../estoque/estoque-list/estoque-list.service';

@Component({
  selector: 'app-operacao-form',
  templateUrl: './operacao-form.component.html',
  styleUrls: ['./operacao-form.component.css']
})
export class OperacaoFormComponent implements OnInit {
  empresaId: number | undefined;
  produtos: Produto[] = [];
  estoques: Estoque[] = [];
  operacao: Operacao = {} as Operacao;
  acesso = '';
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoListService,
    private estoqueService: EstoqueListService, 
    private operacaoService: OperacaoFormService,
    private loteService: LoteFormService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
    });
    this.getProdutos();
    this.getEstoques();
  }

  getProdutos() {
    if (this.empresaId){
      this.produtoService.getProdutos(this.empresaId).subscribe((produtos: Produto[]) => {
        this.produtos = produtos;
      });
    }
  }

  getEstoques() {
    if (this.empresaId){
      this.estoqueService.getEstoques(this.empresaId).subscribe((estoques: Estoque[]) =>{
        this.estoques = estoques;
      })
    }
  }

  save() {
      const loteForCreate = {
        'quantidade': this.operacao.quantidade,
        'codigoLote': this.operacao.codigoLote,
        'dataEntrada': this.operacao.dataEntrada,
        'dataValidade': this.operacao.dataValidade
      } as Lote;
      this.loteService.createLote(loteForCreate).subscribe(() => {
        const operacaoForCreate = {
          'tipoOperacao': this.operacao.tipoOperacao,
          'empresaId': this.operacao.empresaId,
          'produtoId': this.operacao.produtoId,
          'estoqueId': this.operacao.estoqueId,
        }
        this.operacaoService.createOperacao(this.operacao).subscribe(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/produtos'])
        })
      })
}
}

