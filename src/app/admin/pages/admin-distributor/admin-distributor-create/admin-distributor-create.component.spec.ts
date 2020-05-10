import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistributorCreateComponent } from './admin-distributor-create.component';

describe('AdminDistributorCreateComponent', () => {
  let component: AdminDistributorCreateComponent;
  let fixture: ComponentFixture<AdminDistributorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDistributorCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDistributorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
