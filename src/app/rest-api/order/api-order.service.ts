import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_ORDER_CREATE } from '../endpoints';
import { OrderStore, Order } from '../../models/order.model';
import { OrderCreateResponseDto } from './api-order.dtos';
import { fromOrderCreateResponse, toOrderCreateRequest } from './api-order.mappers';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  public constructor(protected http: HttpClient) {}

  public createOrder(order: Order): Observable<OrderStore> {
    return this.http
      .post<OrderCreateResponseDto>(API_URL_ORDER_CREATE, toOrderCreateRequest(order))
      .pipe(
        map(
          (orderCreateResponseDto: OrderCreateResponseDto): OrderStore =>
            fromOrderCreateResponse(orderCreateResponseDto)
        )
      );
  }

  // public getOrder(uuid: string): Observable<OrderStore> {
  //   return of({
  //     id: 232,
  //     uuid,
  //     number: 'WA-123-123',
  //     parcelLocker: null,
  //     paymentUrl: 'https://google.com',
  //     // ---
  //     orderItems: {}
  //   }).pipe(delay(2000)); // TODO implement
  // }
}
