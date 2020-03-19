import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';

import { Order } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_ID } from '../../store/reducers/order.reducers';
import { ApiCall } from '../../models/page.model';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderComponent implements OnInit, OnDestroy {
  public apiCallPromoCode$: Observable<ApiCall> = this.orderFacadeService.apiCallPromoCode$();
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_ID}`);
  public promoCodeTextField$: Observable<string> = this.orderFacadeService.promoCodeTextFieldByUuid$(
    `${POTENTIAL_ORDER_ID}`
  );
  public promoCodeFormGroup: FormGroup;
  public promoCodeSubmitted = false;

  public readonly ApiCall = ApiCall;

  protected unsubscribe$ = new Subject<void>();

  public constructor(protected orderFacadeService: OrderFacadeService, protected formBuilder: FormBuilder) {
    this.buildPromoCodeFormGroup();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public createOrder(): void {
    this.orderFacadeService.createOrder();
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
      promoCodeTextField: ['', Validators.required]
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
