import { environment } from '../../environments/environment';

export const API_URL_CATEGORIES = environment.urlApi + 'category';

export const API_URL_PRODUCT = (isSimple: boolean, categoryId: number): string => {
  const params: string[] = [];

  isSimple && params.push('simple=true');
  categoryId && params.push(`categoryId=${categoryId}`);

  return `${environment.urlApi}product${params.length ? '?' : ''}${params.join('&')}`;
};
