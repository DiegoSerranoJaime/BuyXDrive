import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersProductsFormComponent } from './providers-products-form.component';

describe('ProvidersProductsFormComponent', () => {
  let component: ProvidersProductsFormComponent;
  let fixture: ComponentFixture<ProvidersProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersProductsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
