import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBoxFullComponent } from './product-box-full.component';

describe('ProductBoxFullComponent', () => {
  let component: ProductBoxFullComponent;
  let fixture: ComponentFixture<ProductBoxFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBoxFullComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBoxFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
