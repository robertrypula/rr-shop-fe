import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PRODUCT, API_URL_PRODUCTS } from '../config/api-url.config';
import { Product, ProductFullDto, ProductInitDto, ProductSimpleDto } from '../models/product.model';

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

  public getProducts(ids: number[]): Observable<Product[]> {
    return this.http
      .get<ProductFullDto[]>(API_URL_PRODUCTS(false, null, ids))
      .pipe(
        map((dtos: ProductFullDto[]): Product[] =>
          dtos.map((productDto: ProductFullDto): Product => this.fromFullDto(productDto))
        )
      );
  }

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
      .get<ProductInitDto[]>(API_URL_PRODUCTS(true, null))
      .pipe(
        map((dtos: ProductInitDto[]): Product[] =>
          dtos.map((productDto: ProductInitDto): Product => this.fromInitDto(productDto))
        )
      );
  }

  public fromFullDto(dto: ProductFullDto): Product {
    return {
      categoryIds: dto.categoryIds,
      description: dto.description,
      id: dto.id,
      name: dto.name,
      price: dto.price,
      quantity: dto.quantity,
      slug: dto.slug
    };
  }

  public fromInitDto(dto: ProductInitDto): Product {
    return {
      categoryIds: dto.categoryIds,
      id: dto.id
    };
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
