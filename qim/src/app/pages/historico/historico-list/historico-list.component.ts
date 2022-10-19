import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Historico } from '../model';
import { HistoricoListService } from './historico-list.service';

@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrls: ['./historico-list.component.css']
})
export class HistoricoListComponent implements OnInit {
  empresaId: number | undefined;
  produtoId: number | undefined;
  historico: Historico[] = [];
  paginaAtual = 1;
  requestFailed: boolean = false;
  errorMsg: string | undefined;
  
  constructor(
    private historicoService: HistoricoListService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.produtoId = params['produtoId'];

    });
    this.getHistorico();
  }

  getHistorico() {
    if (this.empresaId && this.produtoId){
      this.historicoService.getHistorico(this.empresaId, this.produtoId).subscribe((historico: Historico[]) => {
        this.historico= historico;
      },(error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
      });
    }
  }

  convertDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("pt-br")+ " " + new Date(timestamp * 1000).toLocaleTimeString("pt-br");
    } else {
      return '';
    }
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }

}
