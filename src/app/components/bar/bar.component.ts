import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Bar, BarType } from '../../models/bar.model';
import { BarService } from '../../services/bar.service';
import { ClickableActionTheme } from '../clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnInit {
  public bars$: Observable<Bar[]> = this.barService.bars$;

  public readonly BarType = BarType;
  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected barService: BarService) {}

  public ngOnInit(): void {}

  public close(id: number): void {
    this.barService.close(id);
  }

  public trackBy(index: number, item: Bar): string {
    return item.id + '';
  }
}
