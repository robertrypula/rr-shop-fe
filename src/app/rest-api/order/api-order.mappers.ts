import { OrderCreateRequestDto, OrderCreateResponseDto } from './api-order.dtos';
import { Order, OrderStore } from '../../models/order.model';

export const toOrderCreateRequest = (order: Order): OrderCreateRequestDto => {
  return null;
};

export const fromOrderCreateResponse = (orderCreateResponseDto: OrderCreateResponseDto): OrderStore => {
  return null;
};
