import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistributorEditComponent } from './admin-distributor-edit.component';

describe('AdminDistributorEditComponent', () => {
  let component: AdminDistributorEditComponent;
  let fixture: ComponentFixture<AdminDistributorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDistributorEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDistributorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
