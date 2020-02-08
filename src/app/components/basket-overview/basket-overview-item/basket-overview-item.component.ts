import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketEntry } from '../../../models/basket.model';

@Component({
  selector: 'rr-shop-basket-overview-item',
  templateUrl: './basket-overview-item.component.html',
  styleUrls: ['./basket-overview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOverviewItemComponent implements OnInit {
  @Input()
  public basketEntry: BasketEntry;

  @Output()
  public remove: EventEmitter<number> = new EventEmitter();

  public constructor() {}

  public ngOnInit(): void {}
}
