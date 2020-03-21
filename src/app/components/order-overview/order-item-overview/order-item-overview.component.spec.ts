import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemOverviewComponent } from './order-item-overview.component';

describe('OrderOverviewItemComponent', () => {
  let component: OrderItemOverviewComponent;
  let fixture: ComponentFixture<OrderItemOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
