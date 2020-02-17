import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PRODUCTS } from '../config/api-url.config';
import { Product, ProductSimpleDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  public constructor(protected http: HttpClient) {}

  public getProductsAtCategory(categoryIds: number[] = null): Observable<Product[]> {
    return this.http
      .get<ProductSimpleDto[]>(API_URL_PRODUCTS(false, categoryIds))
      .pipe(
        map((dtos: ProductSimpleDto[]): Product[] =>
          dtos.map((productDto: ProductSimpleDto): Product => this.fromSimpleDto(productDto))
        )
      );
  }

  public getProductsAtInit(): Observable<Product[]> {
    return this.http
      .get<ProductSimpleDto[]>(API_URL_PRODUCTS(true, null))
      .pipe(
        map((dtos: ProductSimpleDto[]): Product[] =>
          dtos.map((productDto: ProductSimpleDto): Product => this.fromSimpleDto(productDto))
        )
      );
  }

  public fromSimpleDto(dto: ProductSimpleDto): Product {
    return {
      categoryIds: dto.categoryIds,
      id: dto.id,
      name: dto.name,
      price: dto.price,
      slug: dto.slug
    };
  }
}
