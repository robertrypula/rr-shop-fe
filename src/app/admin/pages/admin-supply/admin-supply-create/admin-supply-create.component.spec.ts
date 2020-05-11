import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupplyCreateComponent } from './admin-supply-create.component';

describe('AdminSupplyCreateComponent', () => {
  let component: AdminSupplyCreateComponent;
  let fixture: ComponentFixture<AdminSupplyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSupplyCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupplyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
