import { NgModule } from '@angular/core';

import { BarModule } from './components/bar/bar.module';
import { BreadcrumbsModule } from './components/breadcrumbs/breadcrumbs.module';
import { ContentModule } from './components/content/content.module';
import { FooterModule } from './components/footer/footer.module';
import { HeaderImageSeparatorModule } from './components/header-image-separator/header-image-separator.module';
import { HeaderModule } from './components/header/header.module';
import { HeaderStickyModule } from './components/header-sticky/header-sticky.module';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BarModule,
    BreadcrumbsModule,
    ContentModule,
    FooterModule,
    HeaderImageSeparatorModule,
    HeaderModule,
    HeaderStickyModule
  ]
})
export class RootModule {}
