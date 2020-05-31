import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialOrderPageComponent } from './potential-order-page.component';

describe('PotentialOrderPageComponent', () => {
  let component: PotentialOrderPageComponent;
  let fixture: ComponentFixture<PotentialOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PotentialOrderPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
