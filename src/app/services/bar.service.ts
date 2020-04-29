import { Injectable } from '@angular/core';

import { BarFacadeService } from '../store/facades/bar-facade.service';
import { BarType } from '../models/bar.model';
import { BAR_SUCCESS_MESSAGE_HIDE_DELAY } from '../config';

@Injectable({
  providedIn: 'root'
})
export class BarService {
  // TODO migrate everything to facade and remove service
  public constructor(protected barFacade: BarFacadeService) {}

  public showSuccess(message: string): void {
    let lastId: number;

    this.barFacade.show(message, BarType.Success);
    lastId = this.barFacade.getLastId();
    setTimeout((): void => this.barFacade.close(lastId), BAR_SUCCESS_MESSAGE_HIDE_DELAY);
  }
}
