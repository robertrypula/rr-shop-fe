import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewItemComponent } from './order-overview-item.component';

describe('OrderOverviewItemComponent', () => {
  let component: OrderOverviewItemComponent;
  let fixture: ComponentFixture<OrderOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderOverviewItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
