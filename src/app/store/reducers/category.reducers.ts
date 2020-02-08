import { Action, createReducer, on } from '@ngrx/store';

import * as fromCategoryActions from '../actions/category.actions';
import { Category, StructuralNode } from '../../models/category.model';

export interface State {
  [id: number]: Category;
}

export const initialState: State = {
  1: { id: 1, name: 'Shop categories', structuralNode: StructuralNode.ShopCategories, parentId: null },
  1000: { id: 1000, name: 'Herbaty', slug: 'herbaty', parentId: 1 },
  1001: { id: 1001, name: 'Kawy', slug: 'kawy', parentId: 1 },
  100100: { id: 100100, name: 'Sypane', slug: 'sypane', parentId: 1001 },
  100101: { id: 100101, name: 'Mielone', slug: 'mielone', parentId: 1001 },
  1002: { id: 1002, name: 'Dla seniora', slug: 'dla-seniora', parentId: 1 },
  1003: { id: 1003, name: 'Jakaś długa nazwa kategorii, która wychodzi poza jedną linię', slug: 'jakas', parentId: 1 },
  1004: { id: 1004, name: 'Zioła', slug: 'ziola', parentId: 1 },
  100400: { id: 100400, name: 'Sypane', slug: 'sypane', parentId: 1004 },
  100401: { id: 100401, name: 'Pakowane', slug: 'pakowane', parentId: 1004 },
  100401000: { id: 100401000, name: 'Dobrze', slug: 'dobrze', parentId: 100401 },
  100401001: { id: 100401001, name: 'Bardzo dobrze', slug: 'bardzo-dobrze', parentId: 100401 },
  100402: { id: 100402, name: 'Odmładzające', slug: 'odmladzajace', parentId: 1004 },
  1005: { id: 1005, name: 'Przyprawy', slug: 'przyprawy', parentId: 1 },
  1006: { id: 1006, name: 'Miody', slug: 'miody', parentId: 1 },

  2: { id: 2, name: 'Pages', parentId: null },

  3: { id: 3, name: 'Header', structuralNode: StructuralNode.Header, parentId: 2 },
  4: { id: 4, name: 'Nowości', parentId: 3, slug: 'nowosci' },
  5: { id: 5, name: 'Best sellers', parentId: 3, slug: 'best-sellers' },
  6: { id: 6, name: 'Kontakt', parentId: 3, slug: 'kontakt' },

  10: { id: 10, name: 'Footer', structuralNode: StructuralNode.Footer, parentId: 2 },

  11: { id: 11, name: 'Dostawa i płatności', parentId: 10 },
  110: { id: 110, name: 'Czas realizacji zamówień', slug: 'czas-realizacji-zamowien', parentId: 11 },
  111: { id: 111, name: 'Czas dostawy', slug: 'czas-dostawy', parentId: 11 },
  112: { id: 112, name: 'Dla sklepów', slug: 'dla-sklepow', parentId: 11 },
  113: { id: 113, name: 'Paragony i faktory', slug: 'paragony-i-faktury', parentId: 11 },
  114: { id: 114, name: 'Koszty dostawy', slug: 'koszty-dostawy', parentId: 11 },
  115: { id: 115, name: 'Sposoby płatności', slug: 'sposoby-platnosci', parentId: 11 },

  12: { id: 12, name: 'Pomoc', parentId: 10 },
  120: { id: 120, name: 'Regulamin', slug: 'regulamin', parentId: 12 },
  121: { id: 121, name: 'Rabaty', slug: 'rabaty', parentId: 12 },
  122: { id: 122, name: 'Polityka prywatności', slug: 'polityka-prywatnosci', parentId: 12 },

  13: { id: 13, name: 'O formie', parentId: 10 },
  130: { id: 130, name: 'Informacje o firmie', slug: 'informacje-o-firmie', parentId: 13 },
  131: { id: 131, name: 'Opinie klientów', slug: 'opinie-klientow', parentId: 13 },
  132: { id: 132, name: 'Kontakt', slug: 'kontakt', parentId: 13 },

  14: {
    id: 14,
    name: 'Gdzie nas znaleźć',
    parentId: 10,
    structuralNode: StructuralNode.FooterMap,
    content: '<p>Tarnogajska ??/??<br />50-515 Wrocław</p>'
  }
};

const categoryReducer = createReducer(
  initialState,
  on(
    fromCategoryActions.setActiveLevel,
    (state, { id, activeLevel }): State => {
      return { ...state, [id]: { ...state[id], activeLevel } };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return categoryReducer(state, action);
}
