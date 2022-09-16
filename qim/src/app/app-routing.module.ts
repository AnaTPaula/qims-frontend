import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { EstoqueFormComponent } from './pages/estoque/estoque-form/estoque-form.component';
import { EstoqueListComponent } from './pages/estoque/estoque-list/estoque-list.component';
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
  {path: 'empresa/:empresaId/estoque', component: EstoqueListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/estoque/update/:id', component: EstoqueFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/estoque/create', component: EstoqueFormComponent, canActivate: [AuthGuardService]},
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
