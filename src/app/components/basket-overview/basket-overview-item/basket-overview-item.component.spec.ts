import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketOverviewItemComponent } from './basket-overview-item.component';

describe('BasketOverviewItemComponent', () => {
  let component: BasketOverviewItemComponent;
  let fixture: ComponentFixture<BasketOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketOverviewItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
