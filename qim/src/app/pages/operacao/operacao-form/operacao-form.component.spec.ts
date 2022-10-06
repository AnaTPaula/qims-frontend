import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoFormComponent } from './operacao-form.component';

describe('EFormComponent', () => {
  let component: OperacaoFormComponent;
  let fixture: ComponentFixture<OperacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
