import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStickyComponent } from './header-sticky.component';

describe('HeaderStickyComponent', () => {
  let component: HeaderStickyComponent;
  let fixture: ComponentFixture<HeaderStickyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStickyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
