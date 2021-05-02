import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallescompraComponent } from './detallescompra.component';

describe('DetallescompraComponent', () => {
  let component: DetallescompraComponent;
  let fixture: ComponentFixture<DetallescompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallescompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallescompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
