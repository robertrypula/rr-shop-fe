import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Bar } from '../../models/bar.model';
import { BarService } from '../../services/bar.service';

@Component({
  selector: 'rr-shop-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  public bars$: Observable<Bar[]>;

  public constructor(protected barService: BarService) {
    this.bars$ = barService.bars$;
  }

  public ngOnInit(): void {}

  public close(id: number): void {
    this.barService.close(id);
  }
}
