import { PromoCodeStore } from '../../models/promo-code.model';

import { PromoCodeResponseDto } from './api-promo-code.dtos';

export const fromPromoCodeResponseDto = (promoCodeResponseDto: PromoCodeResponseDto): PromoCodeStore => {
  return {
    name: promoCodeResponseDto.name,
    percentageDiscount: promoCodeResponseDto.percentageDiscount
  };
};
