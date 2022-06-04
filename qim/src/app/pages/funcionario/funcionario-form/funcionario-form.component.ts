import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../model';
import { FuncionarioFormService } from './funcionario-form.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  empresaId: number | undefined;
  funcionarioId: number | undefined;
  funcionario = {} as Funcionario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioFormService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.empresaId = params['empresaId'];
      this.funcionarioId = params['id'];
    });
    if( this.empresaId && this.funcionarioId) {
      this.funcionarioService.getFuncionario(this.empresaId, this.funcionarioId).subscribe((funcionario: Funcionario) => {
        this.funcionario = funcionario;
      });
    } else {
      this.funcionario.acesso = 'total'
    }
  }

  save() {
    if(this.funcionario.id) {
      const funcionarioForUpdate = {
        'id': this.funcionario.id,
        'nomeUsuario': this.funcionario.nomeUsuario,
        'senha': this.funcionario.senha,
        'acesso': this.funcionario.acesso,
        'empresaId': this.funcionario.empresaId
      } as Funcionario;
      this.funcionarioService.updateFuncionario(funcionarioForUpdate).subscribe(() => {
          this.router.navigate(['/empresa/' + this.empresaId + '/funcionario'])
      })
    } else {
      const funcionarioForCreate = {
        'nomeUsuario': this.funcionario.nomeUsuario,
        'senha': this.funcionario.senha,
        'acesso': this.funcionario.acesso,
        'empresaId': this.empresaId
      } as Funcionario;
      this.funcionarioService.createFuncionario(funcionarioForCreate).subscribe(() => {
        this.router.navigate(['/empresa/' + this.empresaId + '/funcionario'])
    })
    }
  }

}
