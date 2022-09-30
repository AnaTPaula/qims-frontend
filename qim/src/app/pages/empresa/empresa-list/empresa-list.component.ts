import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { switchMap, take, EMPTY } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Empresa } from '../model';
import { EmpresaListService } from './empresa-list.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {
  empresas: Empresa[] = [];
  tipo: string | undefined;


  constructor(
    private empresaListService: EmpresaListService,
    private modalService: BsModalService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.tipo = this.cookieService.get('tipo');
  }

  getEmpresas() {
    this.empresaListService.getEmpresas().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
    });
  }

  convertDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("pt-br");
    } else {
      return '';
    }
  }

  deleteEmpresa(empresa: Empresa) {
    const result$ = this.showConfirm(
      'Deletar Empresa',
      'Tem certeza que deseja deletar a empresa ' + empresa.nomeUsuario + '?',
      'Cancelar',
      'Deletar',
      'btn-danger');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.empresaListService.deleteEmpresa(empresa) : EMPTY)
      ).subscribe(() => {
        this.getEmpresas();
      });
  }

  aprovarEmpresa(empresa: Empresa) {
    const empresaForUpdate = {
      'id': empresa.id,
      'nomeUsuario': empresa.nomeUsuario,
      'razaoSocial': empresa.razaoSocial,
      'situacaoConta': 'APROVADO'
    } as Empresa;
    const result$ = this.showConfirm(
      'Aprovar Empresa',
      'Tem certeza que deseja aprovar a empresa ' + empresa.nomeUsuario + '?',
      'Cancelar',
      'Aprovar',
      'btn-success');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.empresaListService.updateSituacaoEmpresa(empresaForUpdate) : EMPTY)
      ).subscribe(() => {
        this.getEmpresas();
      });
  }

  reprovarEmpresa(empresa: Empresa) {
    const empresaForUpdate = {
      'id': empresa.id,
      'nomeUsuario': empresa.nomeUsuario,
      'razaoSocial': empresa.razaoSocial,
      'situacaoConta': 'REPROVADO'
    } as Empresa;
    const result$ = this.showConfirm(
      'Reprovar Empresa',
      'Tem certeza que deseja reprovar a empresa ' + empresa.nomeUsuario + '?',
      'Cancelar',
      'Reprovar',
      'btn-warning');
    result$?.asObservable()
      .pipe(
        take(1),
        switchMap(response => response ? this.empresaListService.updateSituacaoEmpresa(empresaForUpdate) : EMPTY)
      ).subscribe(() => {
        this.getEmpresas();
      });
  }

  showConfirm(title: string, body: string, cancel: string, confirm: string, buttomClass: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = body;
    bsModalRef.content.cancel = cancel;
    bsModalRef.content.confirm = confirm;
    bsModalRef.content.buttomClass = buttomClass;
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

}
