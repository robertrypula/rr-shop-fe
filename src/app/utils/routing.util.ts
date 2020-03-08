const parseUrlId = (url: string, code: string): number => {
  const split: string[] = (url || '').split('/');

  return split.length === 4 && split[0] === '' && split[1] === code && split[2] !== '' ? +split[2] : null;
};

const extractCategoryIdFromProductUrl = (url: string): number => {
  const splitSlash: string[] = (url || '').split('/');
  const productSlugPart: string[] = splitSlash.length === 4 ? splitSlash[3].split(',') : [];

  return productSlugPart.length === 2 && productSlugPart[1] !== '' ? +productSlugPart[1] : null;
};

export const getCategoryId = (url: string): number => {
  let categoryId: number = parseUrlId(url, 'c');

  if (!categoryId && getProductId(url)) {
    categoryId = extractCategoryIdFromProductUrl(url);
  }

  return categoryId;
};

export const getProductId = (url: string): number => parseUrlId(url, 'p');

export const isOnCategoryRoute = (url: string): boolean => url.indexOf('/c/') !== -1;
export const isOnPotentialRoute = (url: string): boolean => url.indexOf('/potential-order') !== -1;
export const isOnProductRoute = (url: string): boolean => url.indexOf('/p/') !== -1;
