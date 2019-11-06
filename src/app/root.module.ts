import { NgModule } from '@angular/core';

import { BreadcrumbsModule } from './components/breadcrumbs/breadcrumbs.module';
import { ContentModule } from './components/content/content.module';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [RootComponent],
  imports: [BreadcrumbsModule, ContentModule, FooterModule, HeaderModule]
})
export class RootModule {}
