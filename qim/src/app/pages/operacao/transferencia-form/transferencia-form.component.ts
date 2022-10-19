import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Produto } from '../../produto/model';
import { Estoque } from '../../estoque/model';
import { Lote } from '../../lote/model';
import { Transferencia } from '../model';
import { TransferenciaFormService } from './transferencia-form.service';
import { ProdutoListService } from '../../produto/produto-list/produto-list.service';
import { EstoqueListService } from '../../estoque/estoque-list/estoque-list.service';

@Component({
  selector: 'app-transferencia-form',
  templateUrl: './transferencia-form.component.html',
  styleUrls: ['./transferencia-form.component.css']
})
export class TransferenciaFormComponent implements OnInit {
  empresaId: number | undefined;
  produtos: Produto[] = [];
  estoquesOrigem: Estoque[] = [];
  estoquesDestino: Estoque[] = [];
  transferencia: Transferencia = {} as Transferencia;
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
    private transferenciaService: TransferenciaFormService,
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
        this.estoquesOrigem = estoques;
        this.estoquesDestino = estoques;
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
        
      })
    }
  }

  save() {
      const transferenciaForCreate = {
        'tipoOperacao': 'TRANSFERENCIA',
        'empresaId': this.empresaId,
        'produtoId': Number.parseInt(this.transferencia.produtoId),
        'estoqueOrigemId': Number.parseInt(this.transferencia.estoqueOrigemId),
        'estoqueDestinoId': Number.parseInt(this.transferencia.estoqueDestinoId),
        'quantidade': this.transferencia.quantidade
      } as Transferencia
      this.transferenciaService.createTransferencia(transferenciaForCreate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/produtos'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
        
      });
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }
}

