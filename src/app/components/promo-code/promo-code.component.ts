import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IconType } from '../icon/icon.models';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Order } from '../../models/order.model';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { ApiCall } from '../../models/root.model';

@Component({
  selector: 'rr-shop-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromoCodeComponent implements OnInit, OnDestroy {
  public apiCallPromoCode$: Observable<ApiCall> = this.orderFacadeService.apiCallPromoCode$();
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_UUID}`);
  public promoCodeTextField$: Observable<string> = this.orderFacadeService.promoCodeTextFieldByUuid$(
    `${POTENTIAL_ORDER_UUID}`
  );
  public promoCodeFormGroup: FormGroup;
  public promoCodeSubmitted = false;

  public readonly ApiCall = ApiCall;
  public readonly IconType = IconType;

  public readonly fieldMaxLength = 12;

  protected unsubscribe$ = new Subject<void>();

  public constructor(protected orderFacadeService: OrderFacadeService, protected formBuilder: FormBuilder) {
    this.buildPromoCodeFormGroup();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public promoCodeOnSubmit(): void {
    this.promoCodeSubmitted = true;

    if (this.promoCodeFormGroup.invalid) {
      return;
    }

    this.orderFacadeService.setPromoCodeTextField(this.promoCodeFormGroup.controls.promoCodeTextField.value);
    this.orderFacadeService.promoCodeRequest();
  }

  public promoCodeReset(): void {
    this.orderFacadeService.promoCodeReset();
  }

  protected buildPromoCodeFormGroup(): void {
    this.promoCodeFormGroup = this.formBuilder.group({
      promoCodeTextField: ['', [Validators.required, Validators.maxLength(this.fieldMaxLength)]]
    });
    this.promoCodeTextField$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((potentialOrderPromoCodeTextField: string): void => {
          this.promoCodeFormGroup.patchValue({
            promoCodeTextField: potentialOrderPromoCodeTextField
          });
        })
      )
      .subscribe();
  }
}
