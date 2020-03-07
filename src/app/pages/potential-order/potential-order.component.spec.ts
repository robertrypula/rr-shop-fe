import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialOrderComponent } from './potential-order.component';

describe('PotentialOrderComponent', () => {
  let component: PotentialOrderComponent;
  let fixture: ComponentFixture<PotentialOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PotentialOrderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
