import { NgModule } from '@angular/core';

import { BreadcrumbsModule } from './components/breadcrumbs/breadcrumbs.module';
import { ContentModule } from './components/content/content.module';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { RootComponent } from './root.component';
import { BarModule } from './components/bar/bar.module';

@NgModule({
  declarations: [RootComponent],
  imports: [BreadcrumbsModule, ContentModule, FooterModule, HeaderModule, BarModule]
})
export class RootModule {}
