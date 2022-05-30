import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaFormComponent } from './pages/empresa/empresa-form/empresa-form.component';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { FuncionarioListComponent } from './pages/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './pages/funcionario/funcionario-form/funcionario-form.component';
import { AlmoxarifadoListComponent } from './pages/almoxarifado/almoxarifado-list/almoxarifado-list.component';
import { AlmoxarifadoFormComponent } from './pages/almoxarifado/almoxarifado-form/almoxarifado-form.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpresaFormComponent,
    EmpresaListComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    AlmoxarifadoListComponent,
    AlmoxarifadoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
