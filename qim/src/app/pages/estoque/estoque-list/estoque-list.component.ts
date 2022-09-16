import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Estoque } from '../model';
import { EstoqueListService } from './estoque-list.service';

@Component({
  selector: 'app-Estoque-list',
  templateUrl: './Estoque-list.component.html',
  styleUrls: ['./Estoque-list.component.css']
})
export class EstoqueListComponent implements OnInit {
  empresaId: number | undefined;
  Estoques: Estoque[] = [];
  acesso: string | undefined;

  constructor(
    private EstoqueService: EstoqueListService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getEstoques();
    this.acesso = this.cookieService.get('acesso');
  }

  getEstoques() {
    if (this.empresaId){
      this.EstoqueService.getEstoques(this.empresaId).subscribe((Estoques: Estoque[]) => {
        this.Estoques = Estoques;
      });
    }
  }

  deleteEstoque(Estoque: Estoque) {
    const result$ = this.showConfirm(
      'Deletar Estoque',
      'Tem certeza que deseja deletar o Estoque ' + Estoque.nome + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.EstoqueService.deleteEstoque(Estoque) : EMPTY)
      ).subscribe(() => {
        this.getEstoques();
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

}