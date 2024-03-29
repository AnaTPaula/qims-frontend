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
  viewPassword: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.usuario.tipo = 'operador';
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
        this.router.navigate(['admin/empresas'])
      } else if (usuario.tipo == 'empresa') {
        this.cookieService.set('situacao', usuario.situacaoConta!);
        this.router.navigate(['/empresa/' + usuario.id + '/operadores'])

      } else if (usuario.tipo == 'operador') {
        this.cookieService.set('acesso', usuario.tipoAcesso!);
        this.cookieService.set('empresa', String(usuario.empresaId!));
        this.cookieService.set('tipoArmazenagem', String(usuario.tipoArmazenagem));
        this.router.navigate(['/empresa/' + usuario.empresaId + '/estoques'])

      } else {
        this.router.navigate(['/']);
      }
    }, (err) => {
      this.msgError = 'Usuário ou senha incorretos.';
    })
  }

  showPassword(){
    this.viewPassword = !this.viewPassword;
  }

}
