import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FuncionarioFormService } from './funcionario-form.service';

@Directive({
  selector: '[uniqueFuncionario]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueFuncionarioDirective, multi: true}]
})
export class UniqueFuncionarioDirective {

  @Input('empresaId') empresaId: any;
  @Input('funcionarioId') funcionarioId: any;
  

  constructor(private funcionarioService: FuncionarioFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.funcionarioService.getFuncionariosByNome(this.empresaId, control.value).pipe(
      map(entities => {
        if(entities && entities.length > 0 && entities[0].id !== this.funcionarioId) {
          return {'uniqueFuncionario': true};
        } else {
          return null;
        }
      })
    );
  }

}
