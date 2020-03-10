import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_URL_ORDER } from '../config/api-url.config';
import { ProductFullDto } from '../models/product.model';
import { OrderStore, OrderDto } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  public constructor(protected http: HttpClient) {}

  public createOrder(): Observable<OrderStore> {
    return this.http
      .post<ProductFullDto>(API_URL_ORDER, { test: 'test' })
      .pipe(map((orderDto: OrderDto): OrderStore => this.fromDto(orderDto)));
  }

  public getOrder(uuid: string): Observable<OrderStore> {
    return of({
      number: 'no',
      payUUrl: 'pay url',
      uuid: '234343'
    }).pipe(delay(2000)); // TODO implement
  }

  protected fromDto(orderDto: OrderDto): OrderStore {
    return {
      number: 'no',
      payUUrl: 'pay url',
      uuid: '234343'
    };
  }
}
