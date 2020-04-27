import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BarFacadeService } from '../store/facades/bar-facade.service';
import { Bar, BarType } from '../models/bar.model';
import { BASKET_BAR_SUCCESS_MESSAGE_HIDE_DELAY } from '../config';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  public bars$: Observable<Bar[]> = this.barFacade.bars$;

  // TODO migrate everything to facade and remove service
  public constructor(protected barFacade: BarFacadeService) {}

  public close(id: number): void {
    this.barFacade.close(id);
  }

  public showSuccess(message: string): void {
    let lastId: number;

    this.barFacade.show(message, BarType.Success);
    lastId = this.barFacade.getLastId();
    setTimeout((): void => this.barFacade.close(lastId), BASKET_BAR_SUCCESS_MESSAGE_HIDE_DELAY);
  }
}
