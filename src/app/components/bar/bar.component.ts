import { Component, OnInit } from '@angular/core';
import { BarService } from './bar.service';
import { Observable } from 'rxjs';
import { Bar } from '../../models/bar.model';

@Component({
  selector: 'rr-shop-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [BarService]
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
