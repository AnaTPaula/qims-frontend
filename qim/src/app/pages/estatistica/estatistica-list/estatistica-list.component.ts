import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { Estatistica } from '../model';
import { EstatisticaListService } from './estatistica-list.service';
import { Chart } from 'chart.js';

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
    if (this.empresaId) {
      this.estatisticaService.getEstatistica(this.empresaId).subscribe((estatistica: Estatistica) => {
        this.estatistica = estatistica;
        this.chartEntrada();
        this.chartSaida();
      });
    }
  }

  convertDate(timestamp: number) {
    if (timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("pt-br") + " " + new Date(timestamp * 1000).toLocaleTimeString("pt-br");
    } else {
      return '';
    }
  }

  checkError() {
    this.requestFailed = false;
  }

  chartEntrada() {
    let labels = [];
    let values = [];
    for (let entrada of this.estatistica.entradaProduto) {
      labels.push(entrada.nome);
      values.push(entrada.quantidade);
    }
    var chartEntrada: any = document.getElementById('chart-entrada');
    /*var ordersChart = new Chart(chartEntrada, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });*/
   
    var barColors = ["red", "green", "blue", "orange", "brown"];
    new Chart(chartEntrada, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            maxBarThickness: 10,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            
          }
        ]
      },
      options: {
        legend: { display: false }
      }
    })
  }

  chartSaida() {
    let labels = [];
    let values = [];
    for (let saida of this.estatistica.saidaProduto) {
      labels.push(saida.nome);
      values.push(saida.quantidade);
    }
    var chartEntrada: any = document.getElementById('chart-saida');
    new Chart(chartEntrada, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            maxBarThickness: 10,
            backgroundColor: 'rgba(255, 0, 0, 0.1)'
          }
        ]
      },
      options: {
        legend: { display: false },
      }
    })
  }

}