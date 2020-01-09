import { Image } from './image.model';

export interface Product {
  categoryIds: number[];
  description: string;
  id: number;
  images: Image[];
  name: string;
  price: number;
  quantity: number;
}
