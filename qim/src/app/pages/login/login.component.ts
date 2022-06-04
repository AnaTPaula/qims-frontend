import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import { Usuario } from './models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;
  msgError: string | undefined;

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.usuario.tipo = 'empresa';
  }

  login() {
    this.msgError = undefined;
    this.loginService.login(this.usuario).subscribe((response) => {
      const usuario = response.body!;
      this.cookieService.deleteAll('/');
      this.cookieService.set('nome', usuario.nomeUsuario);
      this.cookieService.set('tipo', usuario.tipo);
      this.cookieService.set('id', String(usuario.id!));
      this.cookieService.set('token', response.headers.get('token')!);

      if (usuario.tipo == 'administrador') {
        this.router.navigate(['admin/empresa'])
      } else if (usuario.tipo == 'empresa') {
        this.cookieService.set('situacao', usuario.situacaoConta!);
        this.router.navigate(['/empresa/' + usuario.id + '/funcionario'])

      } else if (usuario.tipo == 'funcionario') {
        this.cookieService.set('acesso', usuario.acesso!);
        this.cookieService.set('empresa', String(usuario.empresaId!));
        this.router.navigate(['/empresa/' + usuario.empresaId + '/almoxarifado'])

      } else {
        //this.router.navigate(['/login']);
      }
    }, (err) => {
      this.msgError = 'Usuário ou senha incorretos.';
    })
  }

}
