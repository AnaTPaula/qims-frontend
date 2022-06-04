import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Almoxarifado } from '../model';
import { AlmoxarifadoFormService } from './almoxarifado-form.service';

@Component({
  selector: 'app-almoxarifado-form',
  templateUrl: './almoxarifado-form.component.html',
  styleUrls: ['./almoxarifado-form.component.css']
})
export class AlmoxarifadoFormComponent implements OnInit {
  empresaId: number | undefined;
  almoxarifadoId: number | undefined;
  almoxarifado = {} as Almoxarifado;
  acesso: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private almoxarifadoService: AlmoxarifadoFormService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.almoxarifadoId = params['id'];
    });
    if (this.empresaId && this.almoxarifadoId) {
      this.almoxarifadoService.getAlmoxarifado(this.empresaId, this.almoxarifadoId).subscribe((almoxarifado: Almoxarifado) => {
        this.almoxarifado = almoxarifado;
      });
    }
    this.acesso = this.cookieService.get('acesso');
  }

  save() {
    if (this.almoxarifado.id) {
      const almoxarifadoForUpdate = {
        'id': this.almoxarifado.id,
        'nome': this.almoxarifado.nome,
        'descricao': this.almoxarifado.descricao,
        'empresaId': this.almoxarifado.empresaId
      } as Almoxarifado;
      this.almoxarifadoService.updateAlmoxarifado(almoxarifadoForUpdate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/almoxarifado'])
      })
    } else {
      const almoxarifadoForCreate = {
        'nome': this.almoxarifado.nome,
        'descricao': this.almoxarifado.descricao,
        'empresaId': this.empresaId
      } as Almoxarifado;
      this.almoxarifadoService.createAlmoxarifado(almoxarifadoForCreate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/almoxarifado'])
      })
    }
  }
}
