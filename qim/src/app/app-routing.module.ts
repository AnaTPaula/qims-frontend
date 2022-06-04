import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { AlmoxarifadoFormComponent } from './pages/almoxarifado/almoxarifado-form/almoxarifado-form.component';
import { AlmoxarifadoListComponent } from './pages/almoxarifado/almoxarifado-list/almoxarifado-list.component';
import { EmpresaFormComponent } from './pages/empresa/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { FuncionarioFormComponent } from './pages/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './pages/funcionario/funcionario-list/funcionario-list.component';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'admin/empresa', component: EmpresaListComponent, canActivate: [AuthGuardService]},
  {path: 'admin/empresa/update/:id', component: EmpresaFormComponent, canActivate: [AuthGuardService]},
  {path: 'admin/empresa/create', component: EmpresaFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/almoxarifado', component: AlmoxarifadoListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/almoxarifado/update/:id', component: AlmoxarifadoFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/almoxarifado/create', component: AlmoxarifadoFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/funcionario', component: FuncionarioListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/funcionario/update/:id', component: FuncionarioFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/funcionario/create', component: FuncionarioFormComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'empresa/create', component: EmpresaFormComponent},
  {path: '', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
