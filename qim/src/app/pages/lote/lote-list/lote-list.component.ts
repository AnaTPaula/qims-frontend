import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Lote } from '../model';
import { LoteListService } from './lote-list.service';

@Component({
  selector: 'app-lote-list',
  templateUrl: './lote-list.component.html',
  styleUrls: ['./lote-list.component.css']
})
export class LoteListComponent implements OnInit {
  empresaId: number | undefined;
  lotes: Lote[] = [];
  acesso: string | undefined;
  tipoArmazenagem: string = '';
  paginaAtual = 1;
  requestFailed: boolean = false;
  errorMsg: string | undefined;

  constructor(
    private loteService: LoteListService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getLotes();
    this.acesso = this.cookieService.get('acesso');
    this.tipoArmazenagem = this.cookieService.get('tipoArmazenagem');
  }

  getLotes() {
    if (this.empresaId){
      this.loteService.getLotes(this.empresaId).subscribe((lotes: Lote[]) => {
        this.lotes = lotes;
      },(error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
      });
    }
  }

  deleteLote(lote: Lote) {
    const result$ = this.showConfirm(
      'Deletar Lote',
      'Tem certeza que deseja deletar o Lote ' + lote.codigoLote + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.loteService.deleteLote(lote) : EMPTY)
      ).subscribe(() => {
        this.getLotes();
      });
  }

  showConfirm(title: string, body: string, cancel: string, confirm: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;
    bsModalRef.content.cancel = cancel;
    bsModalRef.content.confirm = confirm;
    bsModalRef.content.buttomClass = 'btn-danger';
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

  convertDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("pt-br");
    } else {
      return '';
    }
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }

}
