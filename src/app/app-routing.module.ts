import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RefCodeComponent } from './components/ref-code/ref-code.component';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { OnboardingComponent } from './components/Onboarding Pages/onboarding/onboarding.component';
import { PersonalnfoComponent } from './components/Onboarding Pages/personalnfo/personalnfo.component';
import { EndPageComponent } from  './components/end-page/end-page.component';
import { AccessGuard } from './Auth/access.guard';
import { TermsandConditionsComponent } from './components/termsand-conditions/termsand-conditions.component';
import { PersonInfoPageGuardGuard } from './Auth/person-info-page-guard.guard';
import {UpdateaccountComponent} from './components/updateaccount/updateaccount.component';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { OtpmodalComponent } from './components/otpmodal/otpmodal.component';
import { FailuremodalComponent } from './components/failuremodal/failuremodal.component';
import {SuccessmodalComponent} from './components/successmodal/successmodal.component';
import {UploadsignatureComponent} from './components/uploadsignature/uploadsignature.component'
import {EmptyimagemodalComponent} from './components/emptyimagemodal/emptyimagemodal.component'
import { from } from 'rxjs';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'refcode', component: RefCodeComponent},
  {path: 'Updateaccount',component:UpdateaccountComponent},
  {path: 'Accountdetails',component:AccountdetailsComponent},
  {path: 'Uploadsignature',component:UploadsignatureComponent},
  {path: 'Otp',component:OtpmodalComponent},
  {path: 'Failure',component:FailuremodalComponent},
  {path: 'Success',component:SuccessmodalComponent},
  {path: 'EmptyImage',component:EmptyimagemodalComponent},
  {path: 'search', component: CompanySearchComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: 'personal', component: PersonalnfoComponent, canActivate: [PersonInfoPageGuardGuard]},
  // {path: 'onboarding', component: OnboardingComponent, canActivate: [AccessGuard]},
  {path: 'end', component: EndPageComponent,  canActivate: [AccessGuard]},
  {path: 'termsandconditions', component: TermsandConditionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
