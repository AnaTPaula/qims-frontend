import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvaAbcListComponent } from './curvaabc-list.component';

describe('CurvaAbcListComponent', () => {
  let component: CurvaAbcListComponent;
  let fixture: ComponentFixture<CurvaAbcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurvaAbcListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvaAbcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
