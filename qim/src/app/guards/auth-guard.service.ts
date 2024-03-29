import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (this.cookieService.get('token')) {
      const tipo = this.cookieService.get('tipo');
      if (tipo === 'administrador') {
        if (state.url.startsWith('/admin')) {
          return true;
        } else {
          this.router.navigate(['/admin/empresas']);
          return false
        }
      } else if (tipo === 'empresa') {
        if (state.url.includes('operador')
        || state.url.includes('infoempresa')
        || state.url.includes('estatistica')
        || state.url.includes('curvaabc')
        || state.url.includes('relatorio')){
          return true;
        } else {
          this.router.navigate(['empresa/'+ this.cookieService.get('id') +'/operadores']);
          return false
        }
      } else if (tipo === 'operador') {
        const acesso = this.cookieService.get('acesso');
        if (state.url.includes('estoque') 
        || state.url.includes('historico') 
        || state.url.includes('produto') 
        || state.url.includes('lote')
        || state.url.includes('operacao')
        || state.url.includes('transferencia')
        || (state.url.includes('estatistica') && acesso === 'total')
        || (state.url.includes('curvaabc') && acesso === 'total')
        || state.url.includes('operador/update')
        || state.url.includes('relatorio') && acesso === 'total'){
          return true;
        } else {
          this.router.navigate(['empresa/'+ this.cookieService.get('empresa') +'/estoques']);
          return false
        }
      }
      this.router.navigate(['/login']);
      return false;

    }

    this.router.navigate(['/login']);
    return false;
  }
}
