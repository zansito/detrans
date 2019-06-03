import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, HeaderComponent } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/domain/login.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CanActivateAuthGuard } from './shared/services/authentication.guard';
import { ToastrModule } from 'ngx-toastr';
import { NgUploaderModule } from 'ngx-uploader';
import { ForgotModule } from 'app/login/forgot/forgot.module';
import { ResetModule } from './login/forgot/reset/reset.module';

export function HttpLoaderFactory(http: Http) {

  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpModule,
    AppRoutingModule,
    LoginModule,
    ResetModule,
    ForgotModule,
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [
    CanActivateAuthGuard,
    LoginService,
    CanActivateAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
