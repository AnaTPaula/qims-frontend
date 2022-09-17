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
    });
    if (this.produtoId && this.empresaId) {
      this.produtoService.getProduto(this.produtoId, this.empresaId).subscribe((produto: Produto) => {
        this.produto = produto;
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
        'empresaId': this.produto.empresaId
      } as Produto;
      this.produtoService.updateProduto(produtoForUpdate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/produto'])
      })
    } else {
      const produtoForCreate = {
        'nome': this.produto.nome,
        'descricao': this.produto.descricao,
        'empresaId': this.empresaId
      } as Produto;
      this.produtoService.createProduto(produtoForCreate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/produto'])
      })
    }
  }
}
