import { environment } from '../../environments/environment';

export const API_URL_CATEGORIES = environment.urlApi + 'category';

export const API_URL_PRODUCT = (isSimple: boolean, categoryIds: number[]): string => {
  const params: string[] = [];

  isSimple && params.push('simple=true');
  categoryIds && params.push(`categoryIds=${categoryIds.join(',')}`);

  return `${environment.urlApi}product${params.length ? '?' : ''}${params.join('&')}`;
};
