import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adm } from '../model';
import { AdmFormService } from './adm-form.service';

@Component({
  selector: 'app-adm-form',
  templateUrl: './adm-form.component.html',
  styleUrls: ['./adm-form.component.css']
})
export class AdmFormComponent implements OnInit {
  admId: number | undefined;
  adm = {} as Adm;
  viewPassword: boolean = false;
  requestFailed: boolean = false;
  requestSuccess: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private admService: AdmFormService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.admId = params['id']);
    if (this.admId) {
      this.admService.getAdm(this.admId).subscribe((adm: Adm) => {
        this.adm = adm;
      }, (error: any) => {
        this.requestFailed = true;
      });
    }
  }

  save() {
    if (this.adm.id) {
      const admForUpdate = {
        'id': this.adm.id,
        'nomeUsuario': this.adm.nomeUsuario,
        'senha': this.adm.senha
      } as Adm;
      this.admService.updateAdm(admForUpdate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/admin/empresas'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
      })
    } else {
      const admForCreate = {
        'nomeUsuario': this.adm.nomeUsuario,
        'senha': this.adm.senha,
      } as Adm;
      this.admService.createAdm(admForCreate).subscribe(() => {
        this.requestSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/admin/empresas'])
        },
          2000);
      }, (error: any) => {
        this.requestFailed = true;
      })
    }
  }

  showPassword() {
    this.viewPassword = !this.viewPassword;
  }

  checkError() {
    this.requestFailed = false;
  }
}
