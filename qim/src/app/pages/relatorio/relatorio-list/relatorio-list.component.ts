import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import {saveAs} from 'file-saver'
import { Relatorio } from '../model';
import { RelatorioListService } from './relatorio-list.service';

@Component({
  selector: 'app-relatorio-list',
  templateUrl: './relatorio-list.component.html',
  styleUrls: ['./relatorio-list.component.css']
})
export class RelatorioListComponent implements OnInit {
  empresaId: number | undefined;
  paginaAtual = 1;
  requestFailed: boolean = false;
  errorMsg: string | undefined;
  
  constructor(
    private relatorioService: RelatorioListService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
    
    });
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }


  onDownloadPDF(tipo:string){
    const relatorio = {
     'tipo': tipo, 
     'arquivo': 'pdf',
     'empresaId': this.empresaId
    } as Relatorio;
    this.relatorioService.getRelatorio(relatorio).subscribe((buffer) => {
      const data: Blob = new Blob([buffer], {
        type: 'application/pdf'
      });
      saveAs(data, 'relatorio_'+ tipo +'.pdf');
    },(error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
  }

  onDownloadCSV(tipo:string){
    const relatorio = {
     'tipo': tipo, 
     'arquivo': 'csv',
     'empresaId': this.empresaId
    } as Relatorio;
    this.relatorioService.getRelatorio(relatorio).subscribe((buffer) => {
      const data: Blob = new Blob([buffer], {
        type: 'text/csv;charset=utf-8'
      });
      saveAs(data, 'relatorio_'+ tipo +'.csv');
    },(error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
  }
}
