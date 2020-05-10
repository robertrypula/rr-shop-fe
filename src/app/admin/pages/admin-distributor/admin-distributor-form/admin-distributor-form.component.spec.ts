import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistributorFormComponent } from './admin-distributor-form.component';

describe('AdminDistributorFormComponent', () => {
  let component: AdminDistributorFormComponent;
  let fixture: ComponentFixture<AdminDistributorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDistributorFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDistributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
