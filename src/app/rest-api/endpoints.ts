import { environment } from '../../environments/environment';
import { FetchType } from './product/api-product.dtos';

export const API_URL_CATEGORIES = `${environment.urlApi}category`;

export const API_URL_ORDER_CREATE = `${environment.urlApi}order`;

export const API_URL_ORDER = (uuid: string): string => `${environment.urlApi}order?uuid=${uuid}`;

export const API_URL_PRODUCT = (productId: number): string => `${environment.urlApi}product/${productId}`;

export const API_URL_PRODUCTS = (
  fetchType: FetchType,
  categoryIds: number[],
  productIds: number[],
  name: string
): string => {
  const params: string[] = [];

  switch (fetchType) {
    case FetchType.Minimal:
      params.push('fetchType=minimal');
      break;
    case FetchType.Medium:
      params.push('fetchType=medium');
      break;
    case FetchType.Full:
      params.push('fetchType=full');
      break;
  }
  categoryIds && params.push(`categoryIds=${categoryIds.join(',')}`);
  productIds && params.push(`productIds=${productIds.join(',')}`);
  name && params.push(`name=${name}`);

  return `${environment.urlApi}product${params.length ? '?' : ''}${params.join('&')}`;
};

export const API_URL_PROMO_CODE = (name: string): string => `${environment.urlApi}promo-code?name=${name}`;
