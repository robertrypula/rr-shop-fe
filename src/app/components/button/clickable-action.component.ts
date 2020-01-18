import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { ClickableActionTheme, ClickableActionType } from './clickable-action.model';

@Component({
  selector: 'rr-shop-clickable-action',
  templateUrl: './clickable-action.component.html',
  styleUrls: ['./clickable-action.component.scss']
})
export class ClickableActionComponent implements OnInit {
  @Input() public clickableActionTheme: ClickableActionTheme = ClickableActionTheme.Primary;
  @Input() public clickableActionType: ClickableActionType = ClickableActionType.Button;
  @Input() public icon: [IconPrefix, IconName] = null;
  @Input() public iconSize: SizeProp = 'lg';
  @Input() public label: string = null;
  @Input() public link: string = null;

  @Output() public actionClick: EventEmitter<Event> = new EventEmitter();

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public constructor() {}

  public ngOnInit() {}

  public onActionClick($event: Event): void {
    this.actionClick.emit($event);
  }
}
