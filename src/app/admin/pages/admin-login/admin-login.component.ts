import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall } from '../../models/admin-component.models';
import { AuthorizationFacadeService } from '../../../store/facades/authorization-facade.service';
import { AuthorizationRequestBody, AuthorizationResponseBody } from '../../models/authorization.models';
import { BarFacadeService } from '../../../store/facades/bar-facade.service';
import { BarService } from '../../../services/bar.service';
import { ButtonType } from '../../../components/clickable-action/clickable-action.model';

// Based on: https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example
// Other nice example: https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/

@Component({
  selector: 'rr-shop-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent extends AdminBaseComponent implements OnInit {
  public error: any;
  public formGroup: FormGroup;
  public submitted = false;

  public loginAdminCall: AdminCall = this.getAdminCall();

  public readonly ButtonType = ButtonType;

  public constructor(
    barFacadeService: BarFacadeService,
    barService: BarService,
    changeDetectorRef: ChangeDetectorRef,
    http: HttpClient,
    route: ActivatedRoute,
    router: Router,

    protected formBuilder: FormBuilder,
    protected authorizationFacadeService: AuthorizationFacadeService
  ) {
    super(barFacadeService, barService, changeDetectorRef, http, route, router);
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.post<AuthorizationResponseBody, AuthorizationRequestBody>(
      this.loginAdminCall,
      'auth/login',
      this.getAuthorizationRequestBody(),
      false
    )
      .pipe(
        tap((response: AuthorizationResponseBody) => {
          // actually it should be in RxJs effect but whole admin was written without store at all so all is fine
          this.authorizationFacadeService.setToken(response.token);
          this.redirectToAdminFeature();
        })
      )
      .subscribe();
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  protected getAuthorizationRequestBody(): AuthorizationRequestBody {
    return {
      username: this.formGroup.controls.username.value,
      password: this.formGroup.controls.password.value
    };
  }

  protected redirectToAdminFeature(): void {
    this.router.navigate(['/admin/order']).then();
  }
}
