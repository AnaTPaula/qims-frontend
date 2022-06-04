import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Almoxarifado } from '../model';
import { AlmoxarifadoListService } from './almoxarifado-list.service';

@Component({
  selector: 'app-almoxarifado-list',
  templateUrl: './almoxarifado-list.component.html',
  styleUrls: ['./almoxarifado-list.component.css']
})
export class AlmoxarifadoListComponent implements OnInit {
  empresaId: number | undefined;
  almoxarifados: Almoxarifado[] = [];
  acesso: string | undefined;

  constructor(
    private almoxarifadoService: AlmoxarifadoListService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['empresaId']);
    this.getAlmoxarifados();
    this.acesso = this.cookieService.get('acesso');
  }

  getAlmoxarifados() {
    if (this.empresaId){
      this.almoxarifadoService.getAlmoxarifados(this.empresaId).subscribe((almoxarifados: Almoxarifado[]) => {
        this.almoxarifados = almoxarifados;
      });
    }
  }

  deleteAlmoxarifado(almoxarifado: Almoxarifado) {
    const result$ = this.showConfirm(
      'Deletar Almoxarifado',
      'Tem certeza que deseja deletar o almoxarifado ' + almoxarifado.nome + '?',
      'Cancelar',
      'Deletar');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.almoxarifadoService.deleteAlmoxarifado(almoxarifado) : EMPTY)
      ).subscribe(() => {
        this.getAlmoxarifados();
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
