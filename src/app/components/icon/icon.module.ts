import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle as farTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleDoubleDown as fasAngleDoubleDown,
  faAngleDoubleUp as fasAngleDoubleUp,
  faChevronDown as fasChevronDown,
  faChevronUp as fasChevronUp,
  faSearch as fasSearch,
  faShoppingBasket as fasShoppingBasket
} from '@fortawesome/free-solid-svg-icons';

import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [FontAwesomeModule]
})
export class IconModule {
  public constructor(library: FaIconLibrary) {
    library.addIcons(
      farTimesCircle,
      fasAngleDoubleDown,
      fasAngleDoubleUp,
      fasChevronDown,
      fasChevronUp,
      fasSearch,
      fasShoppingBasket
    );
  }
}
