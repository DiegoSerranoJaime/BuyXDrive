import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersProductsComponent } from './providers-products.component';

describe('ProvidersProductsComponent', () => {
  let component: ProvidersProductsComponent;
  let fixture: ComponentFixture<ProvidersProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
