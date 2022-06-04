import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpresaFormService } from './empresa-form.service';

@Directive({
  selector: '[uniqueEmpresa]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmpresaDirective, multi: true}]
})
export class UniqueEmpresaDirective {

  @Input('empresaId') empresaId: any;
  

  constructor(private empresaService: EmpresaFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.empresaService.getEmpresasByNome(control.value).pipe(
      map(entities => {
        if(entities && entities.length > 0 && entities[0].id !== this.empresaId) {
          return {'uniqueEmpresa': true};
        } else {
          return null;
        }
      })
    );
  }

}
