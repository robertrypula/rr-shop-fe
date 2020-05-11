import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplyEditComponent } from './admin-supply-edit.component';

describe('AdminSupplyEditComponent', () => {
  let component: AdminSupplyEditComponent;
  let fixture: ComponentFixture<AdminSupplyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSupplyEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupplyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
