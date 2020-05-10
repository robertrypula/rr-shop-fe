import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplyFormComponent } from './admin-supply-form.component';

describe('AdminSupplyFormComponent', () => {
  let component: AdminSupplyFormComponent;
  let fixture: ComponentFixture<AdminSupplyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSupplyFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupplyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
