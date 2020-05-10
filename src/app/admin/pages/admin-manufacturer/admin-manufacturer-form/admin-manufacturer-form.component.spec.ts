import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManufacturerFormComponent } from './admin-manufacturer-form.component';

describe('AdminManufacturerFormComponent', () => {
  let component: AdminManufacturerFormComponent;
  let fixture: ComponentFixture<AdminManufacturerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManufacturerFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManufacturerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
