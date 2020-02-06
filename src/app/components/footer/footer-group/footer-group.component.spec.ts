import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGroupComponent } from './footer-group.component';

describe('FooterGroupComponent', () => {
  let component: FooterGroupComponent;
  let fixture: ComponentFixture<FooterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
