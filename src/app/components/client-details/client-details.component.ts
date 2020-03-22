import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_ID } from '../../store/reducers/order.reducers';

@Component({
  selector: 'rr-shop-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  public clientDetailsForm$: Observable<ClientDetailsForm> = this.orderFacadeService.clientDetailsFormByUuid$(
    `${POTENTIAL_ORDER_ID}`
  );
  public clientDetailsFormGroup: FormGroup;
  public clientDetailsSubmitted = false;

  public readonly maxLengthInput = 50;
  public readonly maxLengthInputEmail = 100;
  public readonly maxLengthInputPhone = 30;
  public readonly maxLengthInputZipCode = 6;
  public readonly maxLengthTextArea = 1000;

  protected unsubscribe$ = new Subject<void>();

  public constructor(protected orderFacadeService: OrderFacadeService, protected formBuilder: FormBuilder) {
    this.buildPromoCodeFormGroup();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public clientDetailsOnSubmit(): void {
    this.clientDetailsSubmitted = true;

    if (this.clientDetailsFormGroup.invalid) {
      return;
    }

    console.log(Object.keys(this.clientDetailsFormGroup.controls));
    // this.orderFacadeService.setClientDetails(this.clientDetailsFormGroup.controls.clientDetailsTextField.value);
  }

  protected buildPromoCodeFormGroup(): void {
    this.clientDetailsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(this.maxLengthInputEmail), Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(this.maxLengthInputPhone)]],
      name: ['', [Validators.required, Validators.maxLength(this.maxLengthInput)]],
      surname: ['', [Validators.required, Validators.maxLength(this.maxLengthInput)]],
      address: ['', [Validators.required, Validators.maxLength(this.maxLengthInput)]],
      zipCode: ['', [Validators.required, Validators.maxLength(this.maxLengthInputZipCode)]],
      city: ['', [Validators.required, Validators.maxLength(this.maxLengthInput)]],
      comments: ['', [Validators.maxLength(this.maxLengthTextArea)]]
    });
    this.clientDetailsForm$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((clientDetailsForm: ClientDetailsForm): void => {
          console.log(clientDetailsForm);
          clientDetailsForm && this.clientDetailsFormGroup.patchValue(clientDetailsForm);
        })
      )
      .subscribe();
  }
}
