import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmoxarifadoFormComponent } from './almoxarifado-form.component';

describe('AlmoxarifadoFormComponent', () => {
  let component: AlmoxarifadoFormComponent;
  let fixture: ComponentFixture<AlmoxarifadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmoxarifadoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmoxarifadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
