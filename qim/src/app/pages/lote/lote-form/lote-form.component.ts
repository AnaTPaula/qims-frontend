import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Lote } from '../model';
import { LoteFormService } from './lote-form.service';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form.component.html',
  styleUrls: ['./lote-form.component.css']
})
export class LoteFormComponent implements OnInit {
  loteId: number | undefined;
  empresaId: number | undefined;
  lote = {} as Lote;
  acesso = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loteService: LoteFormService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.loteId = params['id'];
    });
  }

  save() {
    if (this.lote.id) {
      const loteForUpdate = {
        'id': this.lote.id,
        'codigoLote': this.lote.codigoLote,
        'empresaId': this.lote.empresaId
      } as Lote;
      this.loteService.updateLote(loteForUpdate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/lotes'])
      })
    } else {
      const loteForCreate = {
        'codigoLote': this.lote.codigoLote,
        'empresaId': this.lote.empresaId
      } as Lote;
      this.loteService.createLote(loteForCreate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/lotes'])
      })
    }
  }
}
