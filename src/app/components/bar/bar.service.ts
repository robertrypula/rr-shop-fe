import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bar } from '../../models/bar.model';
import { BarFacadeService } from '../../store/facades/bar-facade.service';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  public bars$: Observable<Bar[]>;

  public constructor(protected barFacade: BarFacadeService) {
    this.bars$ = barFacade.bars$;
  }

  public close(id: number): void {
    this.barFacade.close(id);
  }
}
