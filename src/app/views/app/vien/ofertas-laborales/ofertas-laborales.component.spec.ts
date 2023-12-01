import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasLaboralesComponent } from './ofertas-laborales.component';

describe('OfertasLaboralesComponent', () => {
  let component: OfertasLaboralesComponent;
  let fixture: ComponentFixture<OfertasLaboralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertasLaboralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
