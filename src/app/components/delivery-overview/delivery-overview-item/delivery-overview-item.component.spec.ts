import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOverviewItemComponent } from './delivery-overview-item.component';

describe('DeliveryOverviewItemComponent', () => {
  let component: DeliveryOverviewItemComponent;
  let fixture: ComponentFixture<DeliveryOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryOverviewItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
