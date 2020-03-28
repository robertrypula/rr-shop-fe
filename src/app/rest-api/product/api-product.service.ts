import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PRODUCT, API_URL_PRODUCTS } from '../endpoints';
import { Product } from '../../models/product.model';
import { FetchType, ProductFullDto, ProductMediumDto, ProductMinimalDto } from './api-product.dtos';
import { fromFullDto, fromMediumDto, fromMinimalDto } from './api-product.mappers';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  public constructor(protected http: HttpClient) {}

  public getProduct(id: number): Observable<Product> {
    return this.http
      .get<ProductFullDto>(API_URL_PRODUCT(id))
      .pipe(map((productDto: ProductFullDto): Product => fromFullDto(productDto)));
  }

  public getProductsAtInit(): Observable<Product[]> {
    return this.http
      .get<ProductMinimalDto[]>(API_URL_PRODUCTS(FetchType.Minimal, null, null, null))
      .pipe(
        map((dtos: ProductMinimalDto[]): Product[] =>
          dtos.map((dto: ProductMinimalDto): Product => fromMinimalDto(dto))
        )
      );
  }

  public getProductsAtCategory(categoryIds: number[] = null): Observable<Product[]> {
    return this.http
      .get<ProductMediumDto[]>(API_URL_PRODUCTS(FetchType.Medium, categoryIds, null, null))
      .pipe(
        map((dtos: ProductMediumDto[]): Product[] => dtos.map((dto: ProductMediumDto): Product => fromMediumDto(dto)))
      );
  }

  public getProducts(productIds: number[]): Observable<Product[]> {
    return this.http
      .get<ProductFullDto[]>(API_URL_PRODUCTS(FetchType.Full, null, productIds, null))
      .pipe(map((dtos: ProductFullDto[]): Product[] => dtos.map((dto: ProductFullDto): Product => fromFullDto(dto))));
  }
}
