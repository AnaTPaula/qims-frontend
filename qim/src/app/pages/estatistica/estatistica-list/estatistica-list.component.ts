import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { Estatistica } from '../model';
import { EstatisticaListService } from './estatistica-list.service';

@Component({
  selector: 'app-estatistica-list',
  templateUrl: './estatistica-list.component.html',
  styleUrls: ['./estatistica-list.component.css']
})
export class EstatisticaListComponent implements OnInit {
  empresaId: number | undefined;
  produtoId: number | undefined;
  estatistica: Estatistica = {} as Estatistica;
  paginaAtual = 1;
  requestFailed: boolean = false;
  
  constructor(
    private estatisticaService: EstatisticaListService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.produtoId = params['produtoId'];

    });
    this.getEstatistica();
  }

  getEstatistica() {
    if (this.empresaId){
      this.estatisticaService.getEstatistica(this.empresaId).subscribe((estatistica: Estatistica) => {
        this.estatistica= estatistica;
      });
    }
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
  }

}
