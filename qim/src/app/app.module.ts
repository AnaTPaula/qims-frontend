import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { EstoqueFormComponent } from './pages/estoque/estoque-form/estoque-form.component';
import { ProdutoFormComponent } from './pages/produto/produto-form/produto-form.component';
import { LoteFormComponent } from './pages/lote/lote-form/lote-form.component';
import { UniqueEstoqueDirective } from './pages/estoque/estoque-form/unique-estoque.directive';
import { UniqueProdutoDirective } from './pages/produto/produto-form/unique-produto.directive';
import { UniqueLoteDirective } from './pages/lote/lote-form/unique-lote.directive';
import { EstoqueListComponent } from './pages/estoque/estoque-list/estoque-list.component';
import { ProdutoListComponent } from './pages/produto/produto-list/produto-list.component';
import { LoteListComponent } from './pages/lote/lote-list/lote-list.component';
import { EmpresaFormComponent } from './pages/empresa/empresa-form/empresa-form.component';
import { UniqueEmpresaDirective } from './pages/empresa/empresa-form/unique-empresa.directive';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { OperadorFormComponent } from './pages/operador/operador-form/operador-form.component';
import { UniqueOperadorDirective } from './pages/operador/operador-form/unique-operador.directive';
import { OperadorListComponent } from './pages/operador/operador-list/operador-list.component';
import { AdmFormComponent } from './pages/administrador/adm-form/adm-form.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoricoListComponent } from './pages/historico/historico-list/historico-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdmFormComponent,
    EmpresaFormComponent,
    EmpresaListComponent,
    OperadorListComponent,
    OperadorFormComponent,
    EstoqueListComponent,
    EstoqueFormComponent,
    ProdutoListComponent,
    ProdutoFormComponent,
    HistoricoListComponent,
    LoteListComponent,
    LoteFormComponent,
    LoginComponent,
    ConfirmModalComponent,
    UniqueEstoqueDirective,
    UniqueOperadorDirective,
    UniqueEmpresaDirective,
    UniqueProdutoDirective,
    UniqueLoteDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ModalModule.forRoot()
  ],
  providers: [
    LoginComponent, 
    CookieService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
