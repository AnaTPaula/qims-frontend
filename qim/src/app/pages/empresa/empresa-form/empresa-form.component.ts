import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Empresa } from '../model';
import { EmpresaFormService } from './empresa-form.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  empresaId: number | undefined;
  empresa = {} as Empresa;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private empresaService: EmpresaFormService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.empresaId = params['id']);
    if( this.empresaId) {
      this.empresaService.getEmpresa(this.empresaId).subscribe((empresa: Empresa) => {
        this.empresa = empresa;
      });
    } else {
      this.empresa.tipoArmazenagem = 'FIFO';
    }
  }

  save() {
    if(this.empresa.id) {
      const empresaForUpdate = {
        'id': this.empresa.id,
        'nomeUsuario': this.empresa.nomeUsuario,
        'senha': this.empresa.senha,
        'razaoSocial': this.empresa.razaoSocial
      } as Empresa;
      this.empresaService.updateEmpresa(empresaForUpdate).subscribe(() => {
        if (this.cookieService.get('tipo') === 'administrador'){
          this.router.navigate(['/admin/empresas'])
        } else{
          this.router.navigate(['/empresa/'+ this.empresaId +'/operadores'])
        }
      })
    } else {
      const empresaForCreate = {
        'nomeUsuario': this.empresa.nomeUsuario,
        'senha': this.empresa.senha,
        'razaoSocial': this.empresa.razaoSocial,
        'tipoArmazenagem': this.empresa.tipoArmazenagem,
        'aceiteTermosUso': this.empresa.aceiteTermosUso
      } as Empresa;
      this.empresaService.createEmpresa(empresaForCreate).subscribe(() => {
        this.router.navigate(['/admin/empresas'])
    })
    }
  }

  isLogado() {
    return this.empresaId !== undefined;
  } 

}
