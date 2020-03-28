import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PRODUCT, API_URL_PRODUCTS } from '../endpoints';
import { ProductStore } from '../../models/product.model';
import { FetchType, ProductFullDto, ProductMediumDto, ProductMinimalDto } from './api-product.dtos';
import { fromFullDto, fromMediumDto, fromMinimalDto } from './api-product.mappers';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  public constructor(protected http: HttpClient) {}

  public getProduct(id: number): Observable<ProductStore> {
    return this.http
      .get<ProductFullDto>(API_URL_PRODUCT(id))
      .pipe(map((productDto: ProductFullDto): ProductStore => fromFullDto(productDto)));
  }

  public getProductsAtInit(): Observable<ProductStore[]> {
    return this.http
      .get<ProductMinimalDto[]>(API_URL_PRODUCTS(FetchType.Minimal, null, null, null))
      .pipe(
        map((dtos: ProductMinimalDto[]): ProductStore[] =>
          dtos.map((dto: ProductMinimalDto): ProductStore => fromMinimalDto(dto))
        )
      );
  }

  public getProductsAtCategory(categoryIds: number[] = null): Observable<ProductStore[]> {
    return this.http
      .get<ProductMediumDto[]>(API_URL_PRODUCTS(FetchType.Medium, categoryIds, null, null))
      .pipe(
        map((dtos: ProductMediumDto[]): ProductStore[] => dtos.map((dto: ProductMediumDto): ProductStore => fromMediumDto(dto)))
      );
  }

  public getProducts(productIds: number[]): Observable<ProductStore[]> {
    return this.http
      .get<ProductFullDto[]>(API_URL_PRODUCTS(FetchType.Full, null, productIds, null))
      .pipe(map((dtos: ProductFullDto[]): ProductStore[] => dtos.map((dto: ProductFullDto): ProductStore => fromFullDto(dto))));
  }
}
