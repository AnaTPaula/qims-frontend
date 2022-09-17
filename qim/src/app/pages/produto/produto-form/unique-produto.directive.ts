import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoFormService } from './produto-form.service';

@Directive({
  selector: '[uniqueProduto]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueProdutoDirective, multi: true }]
})
export class UniqueProdutoDirective {

  @Input('produtoId') produtoId: any;
  @Input('empresaId') empresaId: any;


  constructor(private ProdutoService: ProdutoFormService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.ProdutoService.getProdutosByNome(this.empresaId, control.value).pipe(
      map(entities => {
        if (entities && entities.length > 0 && entities[0].id !== this.produtoId) {
          return { 'uniqueProduto': true };
        } else {
          return null;
        }
      })
    );
  }
}
