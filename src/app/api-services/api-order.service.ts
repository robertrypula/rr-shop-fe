import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_URL_ORDER_CREATE } from '../config/api-url.config';
import { OrderStore, OrderDto, OrderCreateDto } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  public constructor(protected http: HttpClient) {}

  // public createOrder(orderStore: OrderStore): Observable<OrderStore> {
  //   return this.http
  //     .post<OrderDto>(API_URL_ORDER_CREATE, orderStore)
  //     .pipe(map((orderDto: OrderDto): OrderStore => this.fromDto(orderDto)));
  // }

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

  // protected fromDto(orderDto: OrderDto): OrderStore {
  //   return {
  //     uuid: orderDto.uuid
  //   };
  // }
}
