import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowTopComponent } from './slideshow-top.component';

describe('SlideshowTopComponent', () => {
  let component: SlideshowTopComponent;
  let fixture: ComponentFixture<SlideshowTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideshowTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
