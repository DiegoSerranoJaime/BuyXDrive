import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTypesFormComponent } from './articles-types-form.component';

describe('ArticlesTypesFormComponent', () => {
  let component: ArticlesTypesFormComponent;
  let fixture: ComponentFixture<ArticlesTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesTypesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
