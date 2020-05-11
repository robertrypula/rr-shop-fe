import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplyListComponent } from './admin-supply-list.component';

describe('AdminSupplyListComponent', () => {
  let component: AdminSupplyListComponent;
  let fixture: ComponentFixture<AdminSupplyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSupplyListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
