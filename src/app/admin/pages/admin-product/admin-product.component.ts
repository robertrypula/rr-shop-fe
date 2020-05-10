import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Component({
  selector: 'rr-shop-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminProductComponent extends AdminBaseComponent implements OnInit {
  public product: AdminCall = this.getAdminCall();
  public productSave: AdminCall = this.getAdminCall();

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.product, `product/${this.route.snapshot.paramMap.get('id')}`).subscribe();
  }

  public save(): void {
    if (confirm('Czy na pewno?')) {
      this.patch(this.productSave, `product/${this.route.snapshot.paramMap.get('id')}`, this.getProductPatchBody())
        .pipe(
          tap(() => {
            this.refresh();
          })
        )
        .subscribe();
    }
  }

  protected getProductPatchBody(): any {
    const product: any = this.product.data;

    return {
      name: product.name,
      description: product.description,
      priceUnit: product.priceUnit,
      notes: product.notes,
      isHidden: product.isHidden
    };
  }
}
