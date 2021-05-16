import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitProductsComponent } from './init-products.component';

describe('InitProductsComponent', () => {
  let component: InitProductsComponent;
  let fixture: ComponentFixture<InitProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
