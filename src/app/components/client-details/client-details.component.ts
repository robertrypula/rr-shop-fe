import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ButtonType } from '../clickable-action/clickable-action.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { DeliveryType } from '../../models/product.model';

// https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
// https://developers.google.com/web/fundamentals/design-and-ux/input/forms/#use_metadata_to_enable_auto-complete
// https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5

@Component({
  selector: 'rr-shop-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  @Input()
  public isClientDetailsSectionValid: boolean;

  public clientDetailsForm$: Observable<ClientDetailsForm> = this.orderFacadeService.clientDetailsFormByUuid$(
    `${POTENTIAL_ORDER_UUID}`
  );
  public clientDetailsFormGroup: FormGroup;
  public clientDetailsSubmitted = false;
  public deliveryTypeByOrderUuid$: Observable<DeliveryType> = this.orderFacadeService.deliveryTypeByOrderUuid$(
    `${POTENTIAL_ORDER_UUID}`
  );
  public isDynamicControlRequired = false;

  public readonly maxLengthInput = 50;
  public readonly maxLengthInputEmail = 100;
  public readonly maxLengthInputPhone = 30;
  public readonly maxLengthInputZipCode = 6;
  public readonly maxLengthTextArea = 1000;

  public readonly ButtonType = ButtonType;
  public readonly DeliveryType = DeliveryType;

  protected unsubscribe$ = new Subject<void>();
  protected clientDetailsFormHash = '';

  public constructor(protected orderFacadeService: OrderFacadeService, protected formBuilder: FormBuilder) {
    this.buildPromoCodeFormGroup();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public clientDetailsOnEdit(): void {
    this.orderFacadeService.clientDetailsEdit();
  }

  public clientDetailsOnSave(): void {
    this.clientDetailsSubmitted = true;

    if (this.clientDetailsFormGroup.invalid) {
      return;
    }

    this.orderFacadeService.clientDetailsSave({
      isClientDetailsFormActive: false,
      email: this.clientDetailsFormGroup.controls.email.value,
      phone: this.clientDetailsFormGroup.controls.phone.value,
      name: this.clientDetailsFormGroup.controls.fname.value,
      surname: this.clientDetailsFormGroup.controls.lname.value,
      address: this.clientDetailsFormGroup.controls.address.value,
      zipCode: this.clientDetailsFormGroup.controls.zip.value,
      city: this.clientDetailsFormGroup.controls.city.value,
      comments: this.clientDetailsFormGroup.controls.comments.value
    });
  }

  protected buildPromoCodeFormGroup(): void {
    this.clientDetailsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(this.maxLengthInputEmail), Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(this.maxLengthInputPhone)]],
      fname: ['', [Validators.required, Validators.maxLength(this.maxLengthInput)]],
      lname: ['', [Validators.required, Validators.maxLength(this.maxLengthInput)]],
      address: [''],
      zip: [''],
      city: [''],
      comments: ['', [Validators.maxLength(this.maxLengthTextArea)]]
    });

    this.clientDetailsForm$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((clientDetailsForm: ClientDetailsForm): void => {
          if (clientDetailsForm && this.clientDetailsFormHash !== JSON.stringify(clientDetailsForm)) {
            this.clientDetailsFormGroup.patchValue({
              email: clientDetailsForm.email,
              phone: clientDetailsForm.phone,
              fname: clientDetailsForm.name,
              lname: clientDetailsForm.surname,
              address: clientDetailsForm.address,
              zip: clientDetailsForm.zipCode,
              city: clientDetailsForm.city,
              comments: clientDetailsForm.comments
            });
            this.clientDetailsFormHash = JSON.stringify(clientDetailsForm);
          }
        })
      )
      .subscribe();

    this.deliveryTypeByOrderUuid$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((deliveryType: DeliveryType): void => {
          const controls: { [key: string]: AbstractControl } = this.clientDetailsFormGroup.controls;
          const isRequired = deliveryType === DeliveryType.InPostCourier;

          controls.address.setValidators(this.getValidatorsForAddress(isRequired));
          controls.zip.setValidators(this.getValidatorsForZipCode(isRequired));
          controls.city.setValidators(this.getValidatorsForCity(isRequired));

          controls.address.updateValueAndValidity();
          controls.zip.updateValueAndValidity();
          controls.city.updateValueAndValidity();

          this.isDynamicControlRequired = isRequired;
        })
      )
      .subscribe();
  }

  protected getValidatorsForAddress(isRequired: boolean): ValidatorFn[] {
    return [...(isRequired ? [Validators.required] : []), Validators.maxLength(this.maxLengthInput)];
  }

  protected getValidatorsForZipCode(isRequired: boolean): ValidatorFn[] {
    return [...(isRequired ? [Validators.required] : []), Validators.maxLength(this.maxLengthInputZipCode)];
  }

  protected getValidatorsForCity(isRequired: boolean): ValidatorFn[] {
    return [...(isRequired ? [Validators.required] : []), Validators.maxLength(this.maxLengthInput)];
  }
}
