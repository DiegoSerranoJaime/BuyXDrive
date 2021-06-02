import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTypesFormComponent } from './vehicles-types-form.component';

describe('VehiclesTypesFormComponent', () => {
  let component: VehiclesTypesFormComponent;
  let fixture: ComponentFixture<VehiclesTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesTypesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
