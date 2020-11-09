import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { RefCodeService } from 'src/app/Services/ref-code.service';
import { CompanySearchService } from 'src/app/Services/company-search.service';
import { EncDecService } from 'src/app/Services/enc-dec.service';
import { environment } from 'src/environments/environment';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';

@Component({
  selector: 'app-ref-code',
  templateUrl: './ref-code.component.html',
  styleUrls: ['./ref-code.component.scss'],
  animations: [
    trigger('fade', [
      transition( 'void => *', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class RefCodeComponent implements OnInit {
  refCodeform: FormGroup;
  showDescription1: boolean;
  showDescription2: boolean;
  showSuccessAlert: boolean;
  showDangerAlert: boolean;
  phoneNumber: string;
  dangerMessage: string;
  loading: boolean;
  errorMessage: string;
  resendingCode: boolean;
  networkErrorMessage = 'Your reference code could not be generated, please check your internet connection.';
  constructor( private _formBuilder: FormBuilder, private route: Router,
    private refCodeServ: RefCodeService,
    private companyServ: CompanySearchService,
    private encDec: EncDecService,
    public sharedData: SharedData
    ) {
    this.showSuccessAlert = false;
    this.showDescription2 = false;
    this.showDangerAlert = false;
    this.loading = false;
    this.resendingCode = false;
   }

   validateRefCode() {
    this.sharedData.productCode = null;
     this.setErrorMessage('');
     this.loading = true;
    const otpId = JSON.parse(localStorage.getItem('Ref'));
    const userOtp = this.refCodeform.value.refCode;
    const payload = {
      'otpCode': userOtp,
      'decryptedOtpId': 'string',
      'otpId': otpId
    };
    this.refCodeServ.validateRefCode(payload).subscribe(res => {
      if (Object.keys(res).length > 0) {
        if (res.responseCode !== '99') {
          if (Object.keys(res.data).length > 1 && res.data.unsuccessful === null ) {
            this.loading = false;
            this.showSuccessAlert = false;
            this.refCodeServ.refCodeStatus.next(res.data.successful);
            this.refCodeServ.refCode.next(userOtp);
            this.refCodeServ.refCodeData.next(res.data);
            this.companyServ.companyName.next(res.data.businessName);
            this.companyServ.salutation.next(res.data.salutation);
            sessionStorage.removeItem('Personal Info');
            this.route.navigateByUrl('/onboarding' );
          } else  {
            this.setErrorMessage('The reference code you entered is invalid.');
          }
        } else {
          this.setErrorMessage('Your code cannot be validated now, pls try again later.');
        }
      }
    }, err => {
      this.setErrorMessage(this.networkErrorMessage);
    });
  }

  // Check if the user is new or redirected from the personal info page
  checkForPersistedPersonalInfoData() {
    const personalInfo = JSON.parse(sessionStorage.getItem('Personal Info'));
    if (personalInfo) {
      this.phoneNumber = personalInfo.phoneNumber;
      this.showDescription1 = true;
      this.showDescription2 = true;
    } else {
      this.showDescription1 = false;
      this.showDescription2 = false;
    }
  }

  resendCode() {
    this.resendingCode = true;
    const personalInfo = JSON.parse(sessionStorage.getItem('Personal Info'));
    this.refCodeServ.getRefCode(personalInfo).subscribe(refCode => {
      if (Object.keys(refCode).length > 0) {
        if (refCode.responseCode === '00' && refCode.responseMessage === 'Successful') {
          localStorage.setItem('Ref', JSON.stringify(refCode.data));
          this.showSuccessAlert = true;
        } else if (refCode.responseCode !== '00') {
          this.setErrorMessage(this.networkErrorMessage);
        }
        this.resendingCode = false;
      }
    }, err => {
      this.resendingCode = false;
      this.setErrorMessage(this.networkErrorMessage);
    });
  }

  closeSuccessAlert() {
    this.showSuccessAlert = false;
  }

  closeDangerAlert() {
    this.showDangerAlert = false;
  }

  setErrorMessage(message) {
    this.errorMessage = message;
    this.loading = false;
    this.resendingCode = false;
  }

  ngOnInit() {
    this.refCodeform = this._formBuilder.group({
      refCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])]
    });
    this.checkForPersistedPersonalInfoData();
  }

}
