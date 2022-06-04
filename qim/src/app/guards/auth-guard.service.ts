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
          this.router.navigate(['/admin/empresa']);
          return false
        }
      } else if (tipo === 'empresa') {
        if (state.url.includes('funcionario')) {
          return true;
        } else {
          this.router.navigate(['empresa/'+ this.cookieService.get('id') +'/funcionario']);
          return false
        }
      } else if (tipo === 'funcionario') {
        if (state.url.includes('almoxarifado')) {
          return true;
        } else {
          this.router.navigate(['empresa/'+ this.cookieService.get('empresa') +'/almoxarifado']);
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
