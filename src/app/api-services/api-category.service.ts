import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoryDto, Category } from '../models/category.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  public constructor(protected http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryDto[]>(environment.urlApi + 'category')
      .pipe(
        map((categoryDtos: CategoryDto[]): Category[] =>
          categoryDtos.map((categoryDto: CategoryDto): Category => this.fromDto(categoryDto))
        )
      );
  }

  public fromDto(categoryDto: CategoryDto): Category {
    return {
      content: categoryDto.content,
      id: categoryDto.id,
      isUnAccessible: categoryDto.isUnAccessible,
      name: categoryDto.name,
      parentId: categoryDto.parentId,
      slug: categoryDto.slug,
      structuralNode: categoryDto.structuralNode
    };
  }
}