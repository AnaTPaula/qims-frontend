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
  requestFailed: boolean = false;
  requestSuccess: boolean = false;

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
    }, (error: any) => {
      this.requestFailed = true;
    });
  }

  save() {
    if (this.lote.id) {
      const loteForUpdate = {
        'id': this.lote.id,
        'codigoLote': this.lote.codigoLote,
        'dataEntrada': this.lote.dataEntrada,
        'dataValidade': this.lote.dataValidade,
        'quantidade': this.lote.quantidade,
        'empresaId': this.lote.empresaId
      } as Lote;
      this.loteService.updateLote(loteForUpdate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/lotes'])
        },
          1000);
      }, (error: any) => {
        this.requestFailed = true;
      })
    } else {
      const loteForCreate = {
        'codigoLote': this.lote.codigoLote,
        'dataEntrada': this.lote.dataEntrada,
        'dataValidade': this.lote.dataValidade,
        'quantidade': this.lote.quantidade,
        'empresaId': this.lote.empresaId
      } as Lote;
      this.loteService.createLote(loteForCreate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/lotes'])
        },
          1000);
      }, (error: any) => {
        this.requestFailed = true;
      })
    }
  }

  checkError() {
    this.requestFailed = false;
  }
}
