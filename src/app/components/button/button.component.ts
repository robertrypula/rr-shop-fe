import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'rr-shop-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  public icon: [IconPrefix, IconName] = null;

  @Output()
  public buttonClick = new EventEmitter<Event>();

  public constructor() {}

  public ngOnInit() {}

  public onButtonClick($event: Event): void {
    this.buttonClick.emit($event);
  }
}
