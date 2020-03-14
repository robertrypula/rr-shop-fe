import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategorySimpleDto, CategoryStore } from '../../models/category.model';
import { API_URL_CATEGORIES } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  public constructor(protected http: HttpClient) {}

  public getCategoriesAtInit(): Observable<CategoryStore[]> {
    return this.http
      .get<CategorySimpleDto[]>(API_URL_CATEGORIES)
      .pipe(
        map((dtos: CategorySimpleDto[]): CategoryStore[] =>
          dtos.map((categoryDto: CategorySimpleDto): CategoryStore => this.fromSimpleDto(categoryDto))
        )
      );
  }

  // TODO move to dedicated file same as Order
  public fromSimpleDto(dto: CategorySimpleDto): CategoryStore {
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
