import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AlmoxarifadoFormComponent } from './pages/almoxarifado/almoxarifado-form/almoxarifado-form.component';
import { UniqueAlmoxarifadoDirective } from './pages/almoxarifado/almoxarifado-form/unique-almoxarifado.directive';
import { AlmoxarifadoListComponent } from './pages/almoxarifado/almoxarifado-list/almoxarifado-list.component';
import { EmpresaFormComponent } from './pages/empresa/empresa-form/empresa-form.component';
import { UniqueEmpresaDirective } from './pages/empresa/empresa-form/unique-empresa.directive';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { FuncionarioFormComponent } from './pages/funcionario/funcionario-form/funcionario-form.component';
import { UniqueFuncionarioDirective } from './pages/funcionario/funcionario-form/unique-funcionario.directive';
import { FuncionarioListComponent } from './pages/funcionario/funcionario-list/funcionario-list.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { HomeComponent } from './pages/home/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpresaFormComponent,
    EmpresaListComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    AlmoxarifadoListComponent,
    AlmoxarifadoFormComponent,
    LoginComponent,
    ConfirmModalComponent,
    UniqueAlmoxarifadoDirective,
    UniqueFuncionarioDirective,
    UniqueEmpresaDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
