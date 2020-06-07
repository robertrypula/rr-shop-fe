import {
  ProductSortBy,
  URL_SORT_BY_NAME_ASCENDING,
  URL_SORT_BY_NAME_DESCENDING,
  URL_SORT_BY_NONE,
  URL_SORT_BY_PRICE_ASCENDING,
  URL_SORT_BY_PRICE_DESCENDING
} from '../models/product.model';

const parseUrlId = (url: string, code: string): string => {
  const split: string[] = (url || '').split('/');

  return split[0] === '' && split[1] === code && split[2] !== '' ? split[2] : null;
};

const extractCategoryIdFromProductUrl = (url: string): number => {
  const splitSlash: string[] = (url || '').split('/');
  const productSlugPart: string[] = splitSlash.length === 4 ? splitSlash[3].split(',') : [];

  return productSlugPart.length === 2 && productSlugPart[1] !== '' ? +productSlugPart[1] : null;
};

export const getCategoryId = (url: string): number => {
  const categoryId: string = parseUrlId(url, 'c');

  return !categoryId && getProductId(url) ? extractCategoryIdFromProductUrl(url) : +categoryId;
};

export const getCategoryProductSortBy = (url: string): ProductSortBy => {
  const splitSlash: string[] = (url || '').split('/');

  if (splitSlash.length >= 5) {
    switch (splitSlash[4]) {
      case URL_SORT_BY_NONE:
        return ProductSortBy.None;
      case URL_SORT_BY_NAME_ASCENDING:
        return ProductSortBy.NameAscending;
      case URL_SORT_BY_NAME_DESCENDING:
        return ProductSortBy.NameDescending;
      case URL_SORT_BY_PRICE_ASCENDING:
        return ProductSortBy.PriceAscending;
      case URL_SORT_BY_PRICE_DESCENDING:
        return ProductSortBy.PriceDescending;
    }
  }

  return ProductSortBy.None;
};

export const getProductId = (url: string): number => {
  const id: string = parseUrlId(url, 'p');

  return id !== null ? +id : null;
};

export const getOrderUuid = (url: string): string => parseUrlId(url.replace('?error=501', ''), 'order');

// -----------------------------------------------

export const isOnCategoryRoute = (url: string): boolean => url.indexOf('/c/') === 0;

export const isOnMainPageRoute = (url: string): boolean => url === '/';

export const isOnOrderRoute = (url: string): boolean => url.indexOf('/order/') === 0;

export const isOnPotentialOrderRoute = (url: string): boolean => url.indexOf('/potential-order') === 0;

export const isOnProductRoute = (url: string): boolean => url.indexOf('/p/') === 0;

export const isOnSearchRoute = (url: string): boolean => url.indexOf('/search/') === 0;
