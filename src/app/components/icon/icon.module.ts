import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle as farTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch as fasSearch, faShoppingBasket as fasShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { IconComponent } from './icon.component';

library.add(...[farTimesCircle, fasSearch, fasShoppingBasket]);

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [FontAwesomeModule]
})
export class IconModule {}
