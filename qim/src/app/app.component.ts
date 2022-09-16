import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qim';

  constructor(
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
  }

  getTipo() {
    return this.cookieService.get('tipo');
  }

  getLogado() {
    return this.cookieService.get('token') ? true : false;
  }

  getEmpresaId() {
    if (this.getTipo() === 'empresa') {
      return this.cookieService.get('id');
    } else {
      return this.cookieService.get('empresa');
    }
  }
}
