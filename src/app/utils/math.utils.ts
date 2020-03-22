export const normalizePrice = (price: number): number => {
  return Math.round(price * 100) / 100;
};
