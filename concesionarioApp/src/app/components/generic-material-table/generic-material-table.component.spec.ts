import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMaterialTableComponent } from './generic-material-table.component';

describe('GenericMaterialTableComponent', () => {
  let component: GenericMaterialTableComponent;
  let fixture: ComponentFixture<GenericMaterialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericMaterialTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
