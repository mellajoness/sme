import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BvnService } from 'src/app/Services/bvn-service.service';
import { CompanySearchService } from 'src/app/Services/company-search.service';
import { RefCodeService } from 'src/app/Services/ref-code.service';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { BvnDetails } from 'src/app/Models/bvnDetails';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss'],
  animations: [
    trigger('fade', [

      transition( 'void => *', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class CompanySearchComponent implements OnInit {
  bvnForm: FormGroup;
  companySearchForm: FormGroup;
  otpForm: FormGroup;
  checking: boolean;
  showBvnForm: boolean;
  showOtpForm: boolean;
  showCompanySearchForm: boolean;
  customerBvnDetails: BvnDetails;
  customerOtpDetails: any;
  displayError: boolean;
  displayedErrorMessage: string;
  errorMessage: string;
  constructor ( private _formBuilder: FormBuilder,
    private bvnservice: BvnService,
    private companySearchServ: CompanySearchService,
    private refCodeServ: RefCodeService,
    private route: Router,
    public sharedData: SharedData) {
    this.checking = false;
    this.showCompanySearchForm = true;
    this.showBvnForm = false;
    this.showOtpForm = false;
    this.displayError = false;
   }

  createBvnForm() {
    this.bvnForm = this._formBuilder.group({
      bvnNum: ['', Validators.compose([Validators.required ])]
    });
  }

  createOtpForm() {
    this.otpForm = this._formBuilder.group({
      otp: ['', Validators.compose([Validators.required ])]
    });
  }

  createCompanySearch() {
    this.companySearchForm = this._formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])]
    });
  }

  verifyBvn() {
    this.displayError = false;
    this.checking = true;
    this.bvnservice.verifyBvn({ 'bvn_id': this.bvnForm.value.bvnNum, 'account_nr': '0000000000', 'BusninessName': this.companySearchForm.value.companyName}).subscribe(response => {
      if (response !== null) {
        if (response.responseCode === '00') {
          this.displayError = false;
          this.showBvnForm = false;
          this.showOtpForm = true;
          this.customerOtpDetails = response.data
          localStorage.setItem('Ref', JSON.stringify(this.customerOtpDetails.otpId));
        } else if (response.responseCode === '02' || response.responseCode === '99' || response.data.watchListed === 'YES') {
          this.displayError = true;
          this.displayedErrorMessage = `Sorry, your BVN is invalid`;
        }
      }
      this.checking = false;
    }, err => {
      this.checking = false;
      this.displayError = true;
      this.displayedErrorMessage = `Sorry, your BVN cannot be validated now, try again`;
    });
  }

  verifyOtp() {
    this.displayError = false;
    this.checking = true;
    const otpInfo = {
      'otpCode': this.otpForm.value.otp,
      'decryptedOtpId': 'string',
      'otpId': this.customerOtpDetails.otpId
    };
    this.refCodeServ.validateRefCode(otpInfo).subscribe(response => {
      if (response !== null) {
        if (response.responseCode === '00' && Object.keys(response.data).length > 1 && response.data.unsuccessful === null) {
          this.refCodeServ.refCode.next(this.otpForm.value.otp);
          this.refCodeServ.refCodeData.next(response.data);
          this.companySearchServ.salutation.next(response.data.salutation);
          this.displayError = false;
          this.route.navigateByUrl('/onboarding');
        } else if (response.responseCode === '02' || response.responseCode === '99') {
          this.displayError = true;
          this.displayedErrorMessage = `Sorry, your have entered an invalid OTP`;
        } else {
          this.displayError = true;
          this.displayedErrorMessage = `Sorry, your have entered an invalid OTP`;
        }
      }
      this.checking = false;
    }, err => {
      this.checking = false;
      this.displayError = true;
      this.displayedErrorMessage = `Sorry, your OTP cannot be validated now, try again`;
    });
  }

  searchCompany () {
    this.sharedData.productCode = null;
    this.displayError = false;
    this.checking = true;
    this.companySearchServ.searchCompanyName(this.companySearchForm.value.companyName).subscribe(response => {
      this.checking = false;
      if (response.responseMessage === 'Not a customer' && response.responseCode === '00') {
        this.companySearchServ.companyName.next(this.companySearchForm.value.companyName);
        this.showBvnForm = true;
        this.showCompanySearchForm = false;
        this.displayError = false;
      } else if (response.responseMessage === 'Successful' && response.responseCode === '00' ) {
        this.displayError = true;
        this.displayedErrorMessage = `Oops, Company name already exist on our record`;
      } else {
        this.displayError = true;
        this.displayedErrorMessage = `Error checking your company name, pls check your internet connection`;
      }
    }, err => {
      this.checking = false;
      this.displayError = true;
      this.displayedErrorMessage = 'Error checking your company name, pls check your internet connection';
    });
  }

  closeAlert() {
    this.displayError = false;
  }

  navigate() {
    if (this.showBvnForm) {
      this.showBvnForm = !this.showBvnForm;
      this.showCompanySearchForm = true;
    } else if (this.showOtpForm) {
      this.showOtpForm = !this.showOtpForm;
      this.showBvnForm = true;
    } else if (this.showCompanySearchForm) {
      this.route.navigateByUrl('/refcode');
    }
  }

  ngOnInit() {
    this.createBvnForm();
    this.createOtpForm();
    this.createCompanySearch();
    this.companySearchServ.companyName.next(null);
  }

}
