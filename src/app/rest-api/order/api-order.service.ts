import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_ORDER, API_URL_ORDER_CREATE } from '../endpoints';
import { OrderStore, Order } from '../../models/order.model';
import { OrderCreateResponseDto, OrderResponseDto } from './api-order.dtos';
import { fromOrderCreateResponseDto, fromOrderResponseDto, toOrderCreateRequest } from './api-order.mappers';

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
            fromOrderCreateResponseDto(orderCreateResponseDto)
        )
      );
  }

  public getOrder(uuid: string): Observable<OrderStore> {
    return this.http
      .get<OrderResponseDto>(API_URL_ORDER(uuid))
      .pipe(map((orderResponseDto: OrderResponseDto): OrderStore => fromOrderResponseDto(orderResponseDto)));
  }
}
