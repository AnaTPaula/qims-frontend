import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmoxarifadoFormComponent } from './pages/almoxarifado/almoxarifado-form/almoxarifado-form.component';
import { AlmoxarifadoListComponent } from './pages/almoxarifado/almoxarifado-list/almoxarifado-list.component';
import { EmpresaFormComponent } from './pages/empresa/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { FuncionarioFormComponent } from './pages/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './pages/funcionario/funcionario-list/funcionario-list.component';

const routes: Routes = [
  {path: 'empresa', component: EmpresaListComponent},
  {path: 'empresa/:id', component: EmpresaFormComponent},
  {path: 'empresa/:empresaId/almoxarifado', component: AlmoxarifadoListComponent},
  {path: 'empresa/:empresaId/almoxarifado/:id', component: AlmoxarifadoFormComponent},
  {path: 'empresa/:empresaId/funcionario', component: FuncionarioListComponent},
  {path: 'empresa/:empresaId/funcionario/:id', component: FuncionarioFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
