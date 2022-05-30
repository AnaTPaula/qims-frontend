import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmoxarifadoListComponent } from './almoxarifado-list.component';

describe('AlmoxarifadoListComponent', () => {
  let component: AlmoxarifadoListComponent;
  let fixture: ComponentFixture<AlmoxarifadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmoxarifadoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmoxarifadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
