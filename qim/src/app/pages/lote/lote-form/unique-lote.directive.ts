import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoteFormService } from './lote-form.service';

@Directive({
  selector: '[uniqueLote]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueLoteDirective, multi: true}]
})
export class UniqueLoteDirective {

  @Input('empresaId') empresaId: any;
  @Input('loteId') loteId: any;
  
  constructor(private loteService: LoteFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.loteService.getLotesByNome(this.empresaId, control.value).pipe(
      map(entities => {
        if(entities && entities.length > 0 && entities[0].id !== this.loteId) {
          return {'uniqueLote': true};
        } else {
          return null;
        }
      })
    );
  }

}
