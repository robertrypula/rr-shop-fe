import { Injectable } from '@angular/core';
import { BASKET_BAR_SUCCESS_MESSAGE_HIDE_DELAY } from '../config/basket.config';
import { BarFacadeService } from '../store/facades/bar-facade.service';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  public constructor(protected barFacade: BarFacadeService) {}

  public showSuccess(message: string): void {
    let lastId: number;

    this.barFacade.showSuccess(message);
    lastId = this.barFacade.getLastId();
    setTimeout((): void => this.barFacade.close(lastId), BASKET_BAR_SUCCESS_MESSAGE_HIDE_DELAY);
  }
}
