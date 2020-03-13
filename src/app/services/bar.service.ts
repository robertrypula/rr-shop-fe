import { Injectable } from '@angular/core';
import { BarFacadeService } from '../store/facades/bar-facade.service';
import { Observable } from 'rxjs';
import { Bar } from '../models/bar.model';
import { ORDER_BAR_SUCCESS_MESSAGE_HIDE_DELAY } from '../config/config';

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

  public showError(message: string): void {
    this.barFacade.showError(message);
  }

  public showSuccess(message: string): void {
    let lastId: number;

    this.barFacade.showSuccess(message);
    lastId = this.barFacade.getLastId();
    setTimeout((): void => this.barFacade.close(lastId), ORDER_BAR_SUCCESS_MESSAGE_HIDE_DELAY);
  }
}
