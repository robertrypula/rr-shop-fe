import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManufacturerEditComponent } from './admin-manufacturer-edit.component';

describe('AdminManufacturerEditComponent', () => {
  let component: AdminManufacturerEditComponent;
  let fixture: ComponentFixture<AdminManufacturerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManufacturerEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManufacturerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
