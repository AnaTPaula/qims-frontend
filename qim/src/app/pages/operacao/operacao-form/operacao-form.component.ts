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
  tipoArmazenagem: string = '';
  acesso = '';
  requestFailed: boolean = false;
  requestSuccess: boolean = false;
  errorMsg: string | undefined;


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
    } ,(error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
    this.getProdutos();
    this.getEstoques();
    this.tipoArmazenagem = this.cookieService.get('tipoArmazenagem');
    this.operacao.tipoOperacao = 'SAIDA';
  }

  getProdutos() {
    if (this.empresaId) {
      this.produtoService.getProdutos(this.empresaId).subscribe((produtos: Produto[]) => {
        this.produtos = produtos;
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
        
      });
    }
  }

  getEstoques() {
    if (this.empresaId) {
      this.estoqueService.getEstoques(this.empresaId).subscribe((estoques: Estoque[]) => {
        this.estoques = estoques;
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
        
      })
    }
  }

  save() {
    console.log(this.operacao)
    if (this.operacao.tipoOperacao === 'ENTRADA') {
      let dataValidade = undefined;
      if(this.operacao.dataValidade) {
        dataValidade = new Date(this.operacao.dataValidade!).getTime() / 1000
      }
      const loteForCreate = {
        'empresaId': this.empresaId,
        'quantidade': this.operacao.quantidade,
        'codigoLote': this.operacao.codigoLote,
        'dataEntrada': new Date(this.operacao.dataEntrada).getTime() / 1000,
        'dataValidade': dataValidade
      } as Lote;
      this.loteService.createLote(loteForCreate).subscribe((lote) => {
        const operacaoForCreate = {
          'tipoOperacao': this.operacao.tipoOperacao,
          'empresaId': this.empresaId,
          'produtoId': Number.parseInt(this.operacao.produtoId),
          'estoqueId': Number.parseInt(this.operacao.estoqueId),
          'localizacao': this.operacao.localizacao,
          'loteId': lote.id,
        } as Operacao
        this.operacaoService.createOperacao(operacaoForCreate).subscribe(() => {
          this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/produtos'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
        })
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
        })

    } else {
      const operacaoForCreate = {
        'tipoOperacao': this.operacao.tipoOperacao,
        'empresaId': this.empresaId,
        'produtoId': Number.parseInt(this.operacao.produtoId),
        'estoqueId': Number.parseInt(this.operacao.estoqueId),
        'quantidade': this.operacao.quantidade
      } as Operacao
      this.operacaoService.createOperacao(operacaoForCreate).subscribe(() => {
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

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }
}

