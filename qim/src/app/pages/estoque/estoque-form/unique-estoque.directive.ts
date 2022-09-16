import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import {Observable } from 'rxjs';
import {map } from 'rxjs/operators';
import { EstoqueFormService } from './estoque-form.service';

@Directive({
  selector: '[uniqueEstoque]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEstoqueDirective, multi: true}]
})
export class UniqueEstoqueDirective {

  @Input('empresaId') empresaId: any;
  @Input('EstoqueId') EstoqueId: any;
  

  constructor(private EstoqueService: EstoqueFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.EstoqueService.getEstoquesByNome(this.empresaId, control.value).pipe(
      map(entities => {
        if(entities && entities.length > 0 && entities[0].id !== this.EstoqueId) {
          return {'uniqueEstoque': true};
        } else {
          return null;
        }
      })
    );
  }

}
