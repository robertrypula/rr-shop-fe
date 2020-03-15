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

export const getProductId = (url: string): number => {
  const id: string = parseUrlId(url, 'p');

  return id !== null ? +id : null;
};

export const getOrderUuid = (url: string): string => parseUrlId(url, 'order');

export const isOnCategoryRoute = (url: string): boolean => url.indexOf('/c/') === 0;

export const isOnOrderRoute = (url: string): boolean => url.indexOf('/order/') === 0;

export const isOnPotentialOrderRoute = (url: string): boolean => url.indexOf('/potential-order') === 0;

export const isOnProductRoute = (url: string): boolean => url.indexOf('/p/') === 0;
