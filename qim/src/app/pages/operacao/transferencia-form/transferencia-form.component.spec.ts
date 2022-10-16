import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaFormComponent } from './transferencia-form.component';

describe('EFormComponent', () => {
  let component: TransferenciaFormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
