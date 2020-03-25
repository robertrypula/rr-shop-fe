import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PRODUCT, API_URL_PRODUCTS } from '../endpoints';
import { Product } from '../../models/product.model';
import { Image } from '../../models/image.model';
import { FetchType, ProductFullDto, ProductMediumDto, ProductMinimalDto } from './api-product.dtos';
import { ImageDto } from '../image/image.dtos';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  public constructor(protected http: HttpClient) {}

  public getProduct(id: number): Observable<Product> {
    return this.http
      .get<ProductFullDto>(API_URL_PRODUCT(id))
      .pipe(map((productDto: ProductFullDto): Product => this.fromFullDto(productDto)));
  }

  public getProductsAtInit(): Observable<Product[]> {
    return this.http
      .get<ProductMinimalDto[]>(API_URL_PRODUCTS(FetchType.Minimal, null, null, null))
      .pipe(
        map((dtos: ProductMinimalDto[]): Product[] =>
          dtos.map((productDto: ProductMinimalDto): Product => this.fromMinimalDto(productDto))
        )
      );
  }

  public getProductsAtCategory(categoryIds: number[] = null): Observable<Product[]> {
    return this.http
      .get<ProductMediumDto[]>(API_URL_PRODUCTS(FetchType.Medium, categoryIds, null, null))
      .pipe(
        map((dtos: ProductMediumDto[]): Product[] =>
          dtos.map((productDto: ProductMediumDto): Product => this.fromMediumDto(productDto))
        )
      );
  }

  public getProducts(productIds: number[]): Observable<Product[]> {
    return this.http
      .get<ProductFullDto[]>(API_URL_PRODUCTS(FetchType.Full, null, productIds, null))
      .pipe(
        map((dtos: ProductFullDto[]): Product[] =>
          dtos.map((productDto: ProductFullDto): Product => this.fromFullDto(productDto))
        )
      );
  }

  public fromMinimalDto(dto: ProductMinimalDto): Product {
    return {
      categoryIds: dto.categoryIds,
      id: dto.id
    };
  }

  public fromMediumDto(dto: ProductMediumDto): Product {
    return {
      categoryIds: dto.categoryIds,
      id: dto.id,
      images: dto.images.map((image: ImageDto): Image => ({ ...image })),
      name: dto.name,
      priceUnit: dto.priceUnit,
      slug: dto.slug
    };
  }

  // TODO move to dedicated file same as Order
  public fromFullDto(dto: ProductFullDto): Product {
    return {
      categoryIds: dto.categoryIds,
      deliveryType: dto.deliveryType,
      description: dto.description,
      id: dto.id,
      images: dto.images.map((image: ImageDto): Image => ({ ...image })),
      name: dto.name,
      paymentType: dto.paymentType,
      priceUnit: dto.priceUnit,
      quantity: dto.quantity,
      slug: dto.slug,
      type: dto.type
    };
  }
}
