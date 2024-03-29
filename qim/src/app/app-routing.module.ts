import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { EstoqueFormComponent } from './pages/estoque/estoque-form/estoque-form.component';
import { EstoqueListComponent } from './pages/estoque/estoque-list/estoque-list.component';
import { EmpresaFormComponent } from './pages/empresa/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { OperadorFormComponent } from './pages/operador/operador-form/operador-form.component';
import { OperadorListComponent } from './pages/operador/operador-list/operador-list.component';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { LoteListComponent } from './pages/lote/lote-list/lote-list.component';
import { LoteFormComponent } from './pages/lote/lote-form/lote-form.component';
import { AdmFormComponent } from './pages/administrador/adm-form/adm-form.component';
import { HistoricoListComponent } from './pages/historico/historico-list/historico-list.component';
import { EstatisticaListComponent } from './pages/estatistica/estatistica-list/estatistica-list.component';
import { OperacaoFormComponent } from './pages/operacao/operacao-form/operacao-form.component';
import { TransferenciaFormComponent } from './pages/operacao/transferencia-form/transferencia-form.component';
import { CurvaAbcListComponent } from './pages/estatistica/curvaabc-list/curvaabc-list.component';
import { RelatorioListComponent } from './pages/relatorio/relatorio-list/relatorio-list.component';

const routes: Routes = [
  {path: 'admin/empresas', component: EmpresaListComponent, canActivate: [AuthGuardService]},
  {path: 'admin/:id', component: AdmFormComponent, canActivate: [AuthGuardService]},
  {path: 'admin/empresa/update/:id', component: EmpresaFormComponent, canActivate: [AuthGuardService]},
  {path: 'admin/empresa/create', component: EmpresaFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:id/infoempresa', component: EmpresaFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/estoques', component: EstoqueListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/estoque/update/:id', component: EstoqueFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/estoque/create', component: EstoqueFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/operadores', component: OperadorListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/operador/update/:id', component: OperadorFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/operador/create', component: OperadorFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/produtos', component: ProdutoListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/produto/update/:id', component: ProdutoFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/produto/create', component: ProdutoFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/lotes', component: LoteListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/lote/create', component: LoteFormComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/produto/:produtoId/historico',component: HistoricoListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/relatorio',component: RelatorioListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/estatistica', component: EstatisticaListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/curvaabc', component: CurvaAbcListComponent, canActivate: [AuthGuardService]},
  {path: 'empresa/:empresaId/operacao', component: OperacaoFormComponent, canActivate:[AuthGuardService]},
  {path: 'empresa/:empresaId/transferencia', component: TransferenciaFormComponent, canActivate:[AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'empresa/create', component: EmpresaFormComponent},
  {path: '', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
