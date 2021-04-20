import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitVehiclesComponent } from './init-vehicles.component';

describe('InitVehiclesComponent', () => {
  let component: InitVehiclesComponent;
  let fixture: ComponentFixture<InitVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
