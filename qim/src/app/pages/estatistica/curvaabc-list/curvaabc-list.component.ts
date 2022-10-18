import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurvaAbc } from '../model';
import { CurvaAbcListService } from './curvaabc-list.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-curvaabc-list',
  templateUrl: './curvaabc-list.component.html',
  styleUrls: ['./curvaabc-list.component.css']
})
export class CurvaAbcListComponent implements OnInit {
  empresaId: number | undefined;
  produtoId: number | undefined;
  curvaabc: CurvaAbc [] = [];
  paginaAtual = 1;
  requestFailed: boolean = false;

  constructor(
    private curvaabcService: CurvaAbcListService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.produtoId = params['produtoId'];

    },(error: any) => {
      this.requestFailed = true;
    });
    this.getCurvaAbc();
  }

  getCurvaAbc() {
    if (this.empresaId) {
      this.curvaabcService.getCurvaAbc(this.empresaId).subscribe((curvaabc: CurvaAbc[]) => {
        this.curvaabc= curvaabc;
        this.chartCurvaAbc();
      },(error: any) => {
        this.requestFailed = true;
      });
    }
  }

  checkError() {
    this.requestFailed = false;
  }

  chartCurvaAbc() {
    let labels = [];
    let valuesPorcento = [];
    let valuesItem = [];
    for (let entrada of this.curvaabc) {
      labels.push(entrada.nomeProduto + '(' + entrada.categoria + ')');
      valuesPorcento.push(entrada.acumulado);
      valuesItem.push(entrada.valorPorcentagem);
    }
    var chartEntrada: any = document.getElementById('chart-curvaabc');
    new Chart(chartEntrada, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: valuesItem,
            backgroundColor: 'rgba(255, 99, 71, 0.9)',
            borderColor: 'rgba(255, 99, 71, 0.9)',
            order: 1
          },
          {
            data: valuesPorcento,
            type: 'line',
            borderColor: 'rgba(255, 99, 71, 0.9)',
            order: 2
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
