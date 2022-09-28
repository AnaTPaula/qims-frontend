import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperadorFormService } from './operador-form.service';

@Directive({
  selector: '[uniqueOperador]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueOperadorDirective, multi: true}]
})
export class UniqueOperadorDirective {

  @Input('empresaId') empresaId: any;
  @Input('operadorId') operadorId: any;
  

  constructor(private operadorService: OperadorFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.operadorService.getOperadoresByNome(this.empresaId, control.value).pipe(
      map(entities => {
        if(entities && entities.length > 0 && entities[0].id !== this.operadorId) {
          return {'uniqueOperador': true};
        } else {
          return null;
        }
      })
    );
  }

}
