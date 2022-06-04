import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import {Observable } from 'rxjs';
import {map } from 'rxjs/operators';
import { AlmoxarifadoFormService } from './almoxarifado-form.service';

@Directive({
  selector: '[uniqueAlmoxarifado]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueAlmoxarifadoDirective, multi: true}]
})
export class UniqueAlmoxarifadoDirective {

  @Input('empresaId') empresaId: any;
  @Input('almoxarifadoId') almoxarifadoId: any;
  

  constructor(private almoxarifadoService: AlmoxarifadoFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.almoxarifadoService.getAlmoxarifadosByNome(this.empresaId, control.value).pipe(
      map(entities => {
        if(entities && entities.length > 0 && entities[0].id !== this.almoxarifadoId) {
          return {'uniqueAlmoxarifado': true};
        } else {
          return null;
        }
      })
    );
  }

}
