import { environment } from '../../environments/environment';

export const API_URL_CATEGORIES = environment.urlApi + 'category';

export const API_URL_PRODUCT = (id: number): string => `${environment.urlApi}product/${id}`;

export const API_URL_PRODUCTS = (isSimple: boolean, categoryIds: number[], ids: number[]): string => {
  const params: string[] = [];

  isSimple && params.push('isSimple=true');
  categoryIds && params.push(`categoryIds=${categoryIds.join(',')}`);
  ids && params.push(`ids=${ids.join(',')}`);

  return `${environment.urlApi}product${params.length ? '?' : ''}${params.join('&')}`;
};
