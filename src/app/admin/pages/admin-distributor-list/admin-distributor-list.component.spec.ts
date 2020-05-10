import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistributorListComponent } from './admin-distributor-list.component';

describe('AdminDistributorListComponent', () => {
  let component: AdminDistributorListComponent;
  let fixture: ComponentFixture<AdminDistributorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDistributorListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDistributorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
