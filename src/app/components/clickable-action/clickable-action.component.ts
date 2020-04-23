import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ClickableActionTheme, ClickableActionType } from './clickable-action.model';
import { IconType } from '../icon/icon.models';

@Component({
  selector: 'rr-shop-clickable-action',
  templateUrl: './clickable-action.component.html',
  styleUrls: ['./clickable-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClickableActionComponent implements OnInit {
  @Input() public clickableActionTheme: ClickableActionTheme = ClickableActionTheme.Primary;
  @Input() public clickableActionType: ClickableActionType = ClickableActionType.Button;
  @Input() public disabled = false;
  @Input() public iconType: IconType = null;
  @Input() public label: string = null;
  @Input() public link: string = null;
  @Input() public target = '_self';
  @Input() public number: number = null;

  @Output() public actionClick: EventEmitter<Event> = new EventEmitter();

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public constructor() {}

  public ngOnInit(): void {}

  public onActionClick($event: Event): void {
    !this.disabled && this.actionClick.emit($event);
  }
}
