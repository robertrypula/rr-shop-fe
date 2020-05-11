import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManufacturerCreateComponent } from './admin-manufacturer-create.component';

describe('AdminManufacturerCreateComponent', () => {
  let component: AdminManufacturerCreateComponent;
  let fixture: ComponentFixture<AdminManufacturerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManufacturerCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManufacturerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
