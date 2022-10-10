import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticaListComponent } from './estatistica-list.component';

describe('EstatisticaListComponent', () => {
  let component: EstatisticaListComponent;
  let fixture: ComponentFixture<EstatisticaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatisticaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
