import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_ORDER } from '../config/api-url.config';
import { ProductFullDto } from '../models/product.model';
import { Order, OrderDto } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  public constructor(protected http: HttpClient) {}

  public createOrder(): Observable<Order> {
    return this.http
      .post<ProductFullDto>(API_URL_ORDER, { test: 'test' })
      .pipe(map((orderDto: OrderDto): Order => this.fromDto(orderDto)));
  }

  protected fromDto(orderDto: OrderDto): Order {
    return {
      number: 'no',
      payUUrl: 'pay url',
      uuid: '234343'
    };
  }
}
