import { Pipe, PipeTransform } from '@angular/core';

import { Status } from '../../models/order.model';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  public transform(status: Status): string {
    switch (status) {
      case Status.PaymentWait:
        return 'Oczekiwanie na płatność';
      case Status.PaymentCompleted:
        return 'Opłacone, przygotowujemy paczkę';
      case Status.Shipped:
        return 'W drodze';
      case Status.ReadyForPickup:
        return 'Gotowe do odbioru';
      case Status.Completed:
        return 'Zakończone sukcesem';
      case Status.Canceled:
        return 'Anulowane';
    }

    return '';
  }
}
