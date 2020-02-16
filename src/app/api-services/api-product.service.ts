import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PRODUCT } from '../config/api-url.config';
import { Product, ProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  public constructor(protected http: HttpClient) {}

  public getProducts(isSimple: boolean = true, categoryIds: number[] = null): Observable<Product[]> {
    return this.http
      .get<ProductDto[]>(API_URL_PRODUCT(isSimple, categoryIds))
      .pipe(
        map((productDtos: ProductDto[]): Product[] =>
          productDtos.map((productDto: ProductDto): Product => this.fromDto(productDto))
        )
      );
  }

  public fromDto(productDto: ProductDto): Product {
    return {
      id: productDto.id,
      categoryIds: productDto.categoryIds,
      name: productDto.name
    };
  }
}
