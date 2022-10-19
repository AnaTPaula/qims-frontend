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
  errorMsg: string | undefined;

  constructor(
    private estatisticaService: EstatisticaListService,
    private modalService: BsModalService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.produtoId = params['produtoId'];

    }, (error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
    });
    this.getEstatistica();
  }

  getEstatistica() {
    if (this.empresaId) {
      this.estatisticaService.getEstatistica(this.empresaId).subscribe((estatistica: Estatistica) => {
        this.estatistica = estatistica;
        this.chartEntrada();
        this.chartSaida();
      }, (error: any) => {
        this.requestFailed = true;
        this.errorMsg = error;
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
    this.errorMsg = undefined;
  }

  chartEntrada() {
    let labels = [];
    let values = [];
    for (let entrada of this.estatistica.entradaProduto) {
      labels.push(entrada.nome);
      values.push(entrada.quantidade);
    }
    var chartEntrada: any = document.getElementById('chart-entrada');
    new Chart(chartEntrada, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            maxBarThickness: 20,
            backgroundColor: 'rgba(255, 99, 71, 0.9)'
          }
        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
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
            maxBarThickness: 20,
            backgroundColor: 'rgba(255, 99, 71, 0.9)'
          }
        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

}
