import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isCollapsed = true;
  public acesso = '';
  public situacao = '';

  constructor(
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.acesso = this.cookieService.get('acesso');
    this.situacao = this.cookieService.get('situacao');
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  getTipo() {
    return this.cookieService.get('tipo');
  }

  getEmpresaId() {
    if (this.getTipo() === 'empresa') {
      return this.cookieService.get('id');
    } else {
      return this.cookieService.get('empresa');
    }
  }

  getId() {
    return this.cookieService.get('id');
  }

  sair() {
    this.cookieService.deleteAll('/');
    this.router.navigate(['/login']);
  }
}
