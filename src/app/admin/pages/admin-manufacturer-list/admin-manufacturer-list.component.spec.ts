import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManufacturerListComponent } from './admin-manufacturer-list.component';

describe('AdminManufacturerListComponent', () => {
  let component: AdminManufacturerListComponent;
  let fixture: ComponentFixture<AdminManufacturerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManufacturerListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManufacturerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
