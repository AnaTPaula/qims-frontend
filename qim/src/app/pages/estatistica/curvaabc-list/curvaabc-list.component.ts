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
  errorMsg: string | undefined;

  constructor(
    private curvaabcService: CurvaAbcListService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.produtoId = params['produtoId'];

    },(error: any) => {
      this.requestFailed = true;
      this.errorMsg = error;
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
        this.errorMsg = error;
      });
    }
  }

  checkError() {
    this.requestFailed = false;
    this.errorMsg = undefined;
  }

  chartCurvaAbc() {
    let labels = [];
    let valuesPorcento = [];
    let valuesItem = [];
    let colors = []
    for (let entrada of this.curvaabc) {
      labels.push(entrada.nomeProduto + '(' + entrada.categoria + ')');
      valuesPorcento.push(entrada.acumulado);
      valuesItem.push(entrada.valorPorcentagem);
      colors.push(this.definirCor(entrada.categoria));
    }
    var chartEntrada: any = document.getElementById('chart-curvaabc');
    new Chart(chartEntrada, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: valuesItem,
            backgroundColor: colors,//'rgba(255, 99, 71, 0.9)',
            borderColor: 'rgba(255, 99, 71, 0.9)',
            order: 1
          },
          {
            data: valuesPorcento,
            type: 'line',
            borderColor: 'rgba(255, 99, 71, 0.9)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
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

  definirCor(categoria: string) {
    if (categoria === 'A') {
      return 'rgba(255, 99, 71, 0.9)'
    } else if (categoria === 'B') {
      return 'rgba(255, 120, 100, 0.9)'
    } else {
      return 'rgba(255, 130, 150, 0.9)'
    }
  }

}
