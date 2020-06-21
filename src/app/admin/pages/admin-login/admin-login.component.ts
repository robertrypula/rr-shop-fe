import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthInterceptor } from '../../rest-api/auth.interceptor';
import { environment } from '../../../../environments/environment';
import { AuthorizationFacadeService } from '../../../store/facades/authorization-facade.service';

// Based on: https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example
// Other nice example: https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/

@Component({
  selector: 'rr-shop-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent implements OnInit {
  public error: any;
  public formGroup: FormGroup;
  public submitted = false;

  public constructor(
    protected formBuilder: FormBuilder,
    protected http: HttpClient,
    protected router: Router,
    protected authorizationFacadeService: AuthorizationFacadeService
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.http
      .post<{ token: string }>(`${environment.urlApi}auth/login`, {
        username: this.formGroup.controls.username.value,
        password: this.formGroup.controls.password.value
      })
      .pipe(
        tap(
          (response: { token: string }): void => {
            // actually it should be in RxJs effect but whole admin was written without store at all so all is fine
            this.authorizationFacadeService.setToken(response.token);
            this.redirectToAdminFeature();
          },
          (error: any): void => {
            this.submitted = false;
            this.error = error;
          }
        )
      )
      .subscribe();
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  protected redirectToAdminFeature(): void {
    this.router.navigate(['/admin/order']).then();
  }
}
