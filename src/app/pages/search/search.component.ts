import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'rr-shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public constructor(public viewportService: ViewportService) {
    viewportService.device$.subscribe(d => console.log(d));
    viewportService.scrolledDownThatHeaderIsNotVisible$.subscribe(d => console.log(d));
    // viewportService.viewportStatus$.subscribe(d => console.log(d));
  }

  public ngOnInit(): void {}
}
