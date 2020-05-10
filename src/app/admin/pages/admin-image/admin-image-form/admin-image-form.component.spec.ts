import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageFormComponent } from './admin-image-form.component';

describe('AdminImageFormComponent', () => {
  let component: AdminImageFormComponent;
  let fixture: ComponentFixture<AdminImageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminImageFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
