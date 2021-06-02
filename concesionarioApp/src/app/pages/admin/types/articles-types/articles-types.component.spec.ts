import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTypesComponent } from './articles-types.component';

describe('ArticlesTypesComponent', () => {
  let component: ArticlesTypesComponent;
  let fixture: ComponentFixture<ArticlesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
