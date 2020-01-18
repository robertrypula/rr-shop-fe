import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableActionComponent } from './clickable-action.component';

describe('ButtonComponent', () => {
  let component: ClickableActionComponent;
  let fixture: ComponentFixture<ClickableActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClickableActionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
