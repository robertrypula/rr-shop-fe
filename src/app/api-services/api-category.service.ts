import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategorySimpleDto, Category } from '../models/category.model';
import { API_URL_CATEGORIES } from '../config/api-url.config';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  public constructor(protected http: HttpClient) {}

  public getCategoriesAtInit(): Observable<Category[]> {
    return this.http
      .get<CategorySimpleDto[]>(API_URL_CATEGORIES)
      .pipe(
        map((dtos: CategorySimpleDto[]): Category[] =>
          dtos.map((categoryDto: CategorySimpleDto): Category => this.fromSimpleDto(categoryDto))
        )
      );
  }

  public fromSimpleDto(dto: CategorySimpleDto): Category {
    // TODO reduce number of data from the backend in simple DTO
    return {
      content: dto.content,
      id: dto.id,
      isUnAccessible: dto.isUnAccessible,
      name: dto.name,
      parentId: dto.parentId,
      slug: dto.slug,
      structuralNode: dto.structuralNode
    };
  }
}
