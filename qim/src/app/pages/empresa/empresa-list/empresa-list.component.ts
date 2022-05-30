import { Component, OnInit } from '@angular/core';
import { Empresa } from '../model';
import { EmpresaListService } from './empresa-list.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  constructor(private empresaListService: EmpresaListService) { }
  empresas: Empresa[] = [];
  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    this.empresaListService.getEmpresas().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
    });
  }

}
