import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBoxCompactComponent } from './product-box-compact.component';

describe('ProductBoxCompactComponent', () => {
  let component: ProductBoxCompactComponent;
  let fixture: ComponentFixture<ProductBoxCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBoxCompactComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBoxCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
