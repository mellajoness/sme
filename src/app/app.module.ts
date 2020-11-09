import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';

import { HeaderComponent } from './Core/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './Core/footer/footer.component';
import { BannerComponent } from './components/landing-page/banner/banner.component';
import { CardNavsComponent } from './components/landing-page/card-navs/card-navs.component';
import { MiniFooterComponent } from './components/landing-page/mini-footer/mini-footer.component';
import { RefCodeComponent } from './components/ref-code/ref-code.component';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { PersonalnfoComponent } from './components/Onboarding Pages/personalnfo/personalnfo.component';
import { OnboardingComponent } from './components/Onboarding Pages/onboarding/onboarding.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './AngularMaterial/material/material.module';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EndPageComponent } from './components/end-page/end-page.component';
import { ErrorPageComponent } from './utilities/error-page/error-page.component';
import { TermsandConditionsComponent } from './components/termsand-conditions/termsand-conditions.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { SharedservicesModule } from 'src/Business/Shared/sharedservices/sharedservices.module';
import {UpdateaccountComponent} from './components/updateaccount/updateaccount.component';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { OtpmodalComponent } from './components/otpmodal/otpmodal.component';
import { FailuremodalComponent } from './components/failuremodal/failuremodal.component';
import { SuccessmodalComponent } from './components/successmodal/successmodal.component';
import { UploadsignatureComponent } from './components/uploadsignature/uploadsignature.component';
import { EmptyimagemodalComponent } from './components/emptyimagemodal/emptyimagemodal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    CardNavsComponent,
    LandingPageComponent,
    RefCodeComponent,
    FooterComponent,
    MiniFooterComponent,
    CompanySearchComponent,
    PersonalnfoComponent,
    OnboardingComponent,
    EndPageComponent,
    ErrorPageComponent,
    TermsandConditionsComponent,
    ProductdetailsComponent,
    UpdateaccountComponent,
    AccountdetailsComponent,
    OtpmodalComponent,
    FailuremodalComponent,
    SuccessmodalComponent,
    UploadsignatureComponent,
    EmptyimagemodalComponent
  ],
  imports: [
  BrowserModule,
  ReactiveFormsModule,
  FormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  MaterialModule,
  AppRoutingModule,
  RecaptchaModule,
  NgxCaptchaModule,
  SharedservicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
