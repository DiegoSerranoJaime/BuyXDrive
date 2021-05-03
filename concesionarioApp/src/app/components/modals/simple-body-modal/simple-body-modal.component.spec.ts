import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBodyModalComponent } from './simple-body-modal.component';

describe('SimpleBodyModalComponent', () => {
  let component: SimpleBodyModalComponent;
  let fixture: ComponentFixture<SimpleBodyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleBodyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBodyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
