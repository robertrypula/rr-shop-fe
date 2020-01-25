import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderImageSeparatorComponent } from './header-image-separator.component';

describe('HeaderImageSeparatorComponent', () => {
  let component: HeaderImageSeparatorComponent;
  let fixture: ComponentFixture<HeaderImageSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderImageSeparatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderImageSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
