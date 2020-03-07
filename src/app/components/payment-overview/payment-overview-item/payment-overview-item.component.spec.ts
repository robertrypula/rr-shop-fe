import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOverviewItemComponent } from './payment-overview-item.component';

describe('PaymentOverviewItemComponent', () => {
  let component: PaymentOverviewItemComponent;
  let fixture: ComponentFixture<PaymentOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentOverviewItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
