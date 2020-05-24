import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRelatedProductsComponent } from './category-related-products.component';

describe('CategoryRelatedProductsComponent', () => {
  let component: CategoryRelatedProductsComponent;
  let fixture: ComponentFixture<CategoryRelatedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryRelatedProductsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
