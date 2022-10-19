import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Produto } from '../model';
import { ProdutoFormService } from './produto-form.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
  produtoId: number | undefined;
  empresaId: number | undefined;
  produto = {} as Produto;
  acesso = '';
  requestFailed: boolean = false;
  requestSuccess: boolean = false;
  errorMsg: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoFormService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.produtoId = params['id'];
      this.empresaId = params['empresaId'];
    }, (error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
    if (this.produtoId && this.empresaId) {
      this.produtoService.getProduto(this.produtoId, this.empresaId).subscribe((produto: Produto) => {
        this.produto = produto;
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
    });
    }
    this.acesso = this.cookieService.get('acesso');
  }

  save() {
    if (this.produto.id) {
      const produtoForUpdate = {
        'id': this.produto.id,
        'nome': this.produto.nome,
        'descricao': this.produto.descricao,
        'preco': this.transformarPreco(this.produto.preco.toString()),
        'unidade': this.produto.unidade,
        'estoqueMinimo': this.produto.estoqueMinimo,
        'estoqueMaximo': this.produto.estoqueMaximo,
        'pontoReposicao': this.produto.pontoReposicao,
        'empresaId': this.produto.empresaId
      } as Produto;
      this.produtoService.updateProduto(produtoForUpdate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/produtos'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
      })
    } else {
      const produtoForCreate = {
        'nome': this.produto.nome,
        'descricao': this.produto.descricao,
        'preco': this.transformarPreco(this.produto.preco.toString()),
        'unidade': this.produto.unidade,
        'estoqueMinimo': this.produto.estoqueMinimo,
        'estoqueMaximo': this.produto.estoqueMaximo,
        'pontoReposicao': this.produto.pontoReposicao,
        'empresaId': this.empresaId
      } as Produto;
      this.produtoService.createProduto(produtoForCreate).subscribe(() => {
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

  transformarPreco(preco: string) {

    if (!preco.includes(',') && !preco.includes('.')) {
      preco = preco + '.0';
    } else if (preco.includes(',')) {
      preco = preco.replace(',', '.');
    }
    return Number.parseFloat(preco);
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }

}
