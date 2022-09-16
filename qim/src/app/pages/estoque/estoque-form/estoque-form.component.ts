import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Estoque } from '../model';
import { EstoqueFormService } from './estoque-form.service';

@Component({
  selector: 'app-Estoque-form',
  templateUrl: './Estoque-form.component.html',
  styleUrls: ['./Estoque-form.component.css']
})
export class EstoqueFormComponent implements OnInit {
  empresaId: number | undefined;
  EstoqueId: number | undefined;
  Estoque = {} as Estoque;
  acesso: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private EstoqueService: EstoqueFormService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.EstoqueId = params['id'];
    });
    if (this.empresaId && this.EstoqueId) {
      this.EstoqueService.getEstoque(this.empresaId, this.EstoqueId).subscribe((Estoque: Estoque) => {
        this.Estoque = Estoque;
      });
    }
    this.acesso = this.cookieService.get('acesso');
  }

  save() {
    if (this.Estoque.id) {
      const EstoqueForUpdate = {
        'id': this.Estoque.id,
        'nome': this.Estoque.nome,
        'descricao': this.Estoque.descricao,
        'empresaId': this.Estoque.empresaId
      } as Estoque;
      this.EstoqueService.updateEstoque(EstoqueForUpdate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/Estoque'])
      })
    } else {
      const EstoqueForCreate = {
        'nome': this.Estoque.nome,
        'descricao': this.Estoque.descricao,
        'empresaId': this.empresaId
      } as Estoque;
      this.EstoqueService.createEstoque(EstoqueForCreate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/Estoque'])
      })
    }
  }
}
