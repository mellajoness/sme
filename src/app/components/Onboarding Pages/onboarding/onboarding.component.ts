import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanySearchService } from './../../../Services/company-search.service';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { AccountCreation } from 'src/app/Models/acountCreation';
import { BvnService } from 'src/app/Services/bvn-service.service';
import { AccountCreationService } from 'src/app/Services/account-creation.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { RefCodeService } from 'src/app/Services/ref-code.service';
import { EncDecService } from 'src/app/Services/enc-dec.service';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit, OnDestroy {
  recaptcha: string;
  recaptchaIsValid: boolean;
  isLinear = true;
  busninessInfo: FormGroup;
  validationForm: FormGroup;
  businesses = [
    { value: 'trading', viewValue: 'Trading' },
    { value: 'manufacturing', viewValue: 'Manufacturing' },
    { value: 'medicine', viewValue: 'Medicine' }
  ];
  accountTypeRegistered = [
    // tslint:disable-next-line: max-line-length
    { name: 'Fidelity Small Business Account (FSBA)', code: 'CA560', desc: 'It has Zero maintenance and monthly charges while maintaining a minimum of N10,000 daily.' },
    { name: 'Fidelity Premium Business Account (FPBA 1) ', code: 'CA508', desc: 'It is targeted at medium to high level/structured SMEs ' },
    // tslint:disable-next-line: max-line-length
    { name: 'Fidelity Business Plus (FB +)', code: 'CA565', desc: 'It has a low maintenance charge and free lifetime access to the SAGE accounting software.' },
  ];
  accoutTypeUnregistered = [
    // tslint:disable-next-line: max-line-length
    { name: 'Geep Unregistered Current', code: 'OD420', desc: 'It has no account maintenance fee for monthly debit turnovers of N300,000 and below' },
  ];
  businessCategory = [
    { name: 'Registered', value: '1' },
    { name: 'Unregistered', value: '2' }
  ];
  modeCategory = [
    { name: 'RC Number', value: '1' },
    { name: 'BN Number', value: '2' }
  ];
  companyName: string;
  alive: boolean;
  showRegistered: boolean;
  showAccountType: boolean;
  bvnDetails: any;
  errorMessage: string;
  loading: boolean;
  salutation: string;
  occupations: [];
  branches: [];
  userOtp: string;
  rcNumber: string;
  userOtpData;
  mode;
  modeGroup;
  displayError;
  displayedErrorMessage;
  read;
  accountTypeValue;
  agreeToTerms;
  constructor(private _formBuilder: FormBuilder,
    private companyNameServ: CompanySearchService,
    private bvnServ: BvnService,
    private route: Router,
    private refCodeServ: RefCodeService,
    private encDec: EncDecService,
    private accountCreationServ: AccountCreationService,
    public sharedData: SharedData) {
    this.alive = true; this.showRegistered = false; this.showAccountType = false;
    this.loading = false;
    this.modeGroup = this.modeCategory[0].value;
  }

  radioChange(e) {
    e.value === '1' || '2' ? this.showAccountType = true : this.showAccountType = false;
    e.value === '1' ? this.showRegistered = true : this.showRegistered = false;
    this.recaptchaIsValid = false;
    this.accountTypeValue = "";
    this.sharedData.productCode = null;
    this.agreeToTerms = false;
  }

  modeChange(e) {
    this.mode = e.value;
    this.rcNumber = "";
  }

  retry() {
    this.displayError = false;
    this.route.navigateByUrl('/refcode');
  }

  setAccountCreationParams() {
    let payload: AccountCreation;
    payload = {
      companyName: !this.showRegistered && this.showAccountType ? this.userOtpData.firstName + " " + this.userOtpData.lastName : this.companyName,
      bvnId: this.bvnDetails.bvn || this.bvnDetails,
      phone: this.busninessInfo.value.phoneNumber,
      referralStaff: this.busninessInfo.value.referralStaff,
      accountType: '2',
      rcNumber: this.showRegistered ? this.validationForm.value.rCNumber : null,
      corporateName: !this.showRegistered && this.showAccountType ? this.userOtpData.firstName + " " + this.userOtpData.lastName : this.companyName,
      salutation: this.salutation,
      cifID: null,
      createdBy: null,
      baselCode: 'TIER3',
      accountOfficerCode: 'p1695',
      glSubHeadCode: null,
      currencyCode: 'NGN',
      permanentAddress: this.validationForm.value.businessAddress,
      schmCode: this.validationForm.value.accountType.code,
      primarySolId: '000',
      idExpiryDate: this.getDate(),
      idExpiryDateFieldSpecified: true,
      idIssueDate: this.getDate(),
      emailaddress: this.busninessInfo.value.email,
      occupation: this.validationForm.value.businessType,//"string",
      preferredBranch: this.validationForm.value.preferredBranch
    };
    this.createAccount(payload);
  }

  createAccount(payload) {
    this.setErrorMessage('');
    this.displayError = false;
    this.loading = true;
    const otpId = JSON.parse(localStorage.getItem('Ref'));
    const otpInfo = {
      'otpCode': this.userOtp,
      'decryptedOtpId': 'string',
      'otpId': otpId
    };
    // Call API to check the validity of OTP
    this.refCodeServ.validateRefCode(otpInfo).subscribe(response => {
      if (response.responseCode === '00' && Object.keys(response.data).length > 1 && response.data.unsuccessful === null) {
        this.refCodeServ.refCodeStatus.next(response.data.successful);
        // Call API to retire this current OTP
        this.accountCreationServ.validateAccountCreation(otpInfo).subscribe(resp => {
          if (resp) {
            // tslint:disable-next-line: max-line-length
            if (resp.responseCode === '00' && resp.data === 'Account Creation Sucessful') {  // If the otp was successfully retired
              // Call the API to create account
              this.accountCreationServ.createAccount(payload).subscribe(res => {
                if (Object.keys(res).length > 0) {
                  this.loading = false;
                  if (res.responseCode === '00' && res.data.responseCode === '00') {
                    this.accountCreationServ.newAccountNumber.next(res.data.accountNumber);
                    this.bvnServ.bvnDetails.next(null);
                    if (!this.showRegistered && this.showAccountType) { this.companyNameServ.companyName.next(this.userOtpData.firstName + " " + this.userOtpData.lastName); }
                    this.route.navigateByUrl('/end');
                  } else if (res.responseCode === '02') {
                    this.setErrorMessage(res.responseMessage);
                  } else if (res.responseCode === '99') {
                    // this.setErrorMessage(`Error creating a new account, please try again`);
                    this.displayError = true;
                    this.displayedErrorMessage = `Error creating a new account, please try again`;
                    this.disableField();
                  } else if (res.responseCode === '02') {
                    this.setErrorMessage(res.responseMessage);
                  }
                }
              }, err => {
                // this.setErrorMessage(`Error creating a new account, please try again`);
                this.displayError = true;
                this.displayedErrorMessage = `Error creating a new account, please try again`;
                this.disableField();
              });
            } else {
              // this.setErrorMessage(`Error creating a new account, please try again`);
              this.displayError = true;
              this.displayedErrorMessage = `Error creating a new account, please try again`;
              this.disableField();
            }
          }
        }, err => {
          // this.setErrorMessage(`Error creating a new account, please try again`);
          this.displayError = true;
          this.displayedErrorMessage = `Error creating a new account, please try again`;
          this.disableField();
        });
      } else {
        // this.setErrorMessage(`Error creating a new account, check that you have a valid registration code.`);
        this.displayError = true;
        this.displayedErrorMessage = `Error creating a new account, check that you have a valid registration code.`;
        this.disableField();
      }
    }, err => {
      this.setErrorMessage(`Error creating a new account, please check your internet connection.`);
    });

  }

  getDate() {
    return new Date().toUTCString();
  }

  getCompany() {
    this.companyNameServ.companyName$.pipe(takeWhile(() => this.alive)).subscribe(name => {
      if (name) {
        this.companyName = name;
        this.setCompanyNameField();
      }
    });
  }

  getSalutation() {
    this.companyNameServ.salutation$.pipe(takeWhile(() => this.alive)).subscribe(salutation => {
      if (salutation) {
        this.salutation = salutation;
      }
    });
  }

  getBvnDetails() {
    this.bvnServ.bvnDetails$.pipe(takeWhile(() => this.alive)).subscribe(details => {
      if (details) {
        this.bvnDetails = details;
      } else {
        this.bvnDetails = 'string';
      }
    });
  }

  setCompanyNameField() {
    this.busninessInfo.get('name').setValue(this.companyName);
    this.busninessInfo.get('name').disable();
  }

  getOccupationCatalogues() {
    this.setErrorMessage('');
    this.accountCreationServ.getOccupations().subscribe(response => {
      if (Object.keys(response).length > 0) {
        if (response.responseCode === '00') {
          this.occupations = response.data;
        } else {
          this.setErrorMessage('Please check your internet connection');
        }
      }
    })
  }

  getBranches() {
    this.setErrorMessage('');
    this.accountCreationServ.getBranches().subscribe(response => {
      if (Object.keys(response).length > 0) {
        if (response.responseCode === '00') {
          this.branches = response.data;
        } else {
          this.setErrorMessage('Please check your internet connection');
        }
      }
    })
  }

  getUserOtp() {
    this.refCodeServ.refCode$.pipe(takeWhile(() => this.alive)).subscribe(otp => {
      this.userOtp = otp;
    });
  }

  getUserOtpData() {
    this.refCodeServ.refCodeData$.pipe(takeWhile(() => this.alive)).subscribe(otpData => {
      this.userOtpData = otpData;
    });
  }

  disableField() {
    this.validationForm.get('businessCategory').disable();
    this.validationForm.get('rCNumber').disable();
    this.validationForm.get('businessType').disable();
    this.validationForm.get('businessAddress').disable();
    this.validationForm.get('accountType').disable();
  }

  rcNumberChanged(e) {
    // console.log(e);
  }

// reCaptcha validation
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;

    // Call backend API to validate token
    this.accountCreationServ.validateReCaptchaToken(this.recaptcha).subscribe(
      res => {
        if (res.responseMessage === 'Successful') {
          this.recaptchaIsValid = true;
        } else {
          this.recaptchaIsValid = false;
        }
      }
    );
  }



  setErrorMessage(message) {
    this.errorMessage = message;
    this.loading = false;
  }
  ngOnInit() {
    this.busninessInfo = this._formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      referralStaff: ['']
    });

    this.validationForm = this._formBuilder.group({
      businessCategory: ['', Validators.required],
      rCNumber: ['', Validators.required],
      businessType: ['', Validators.required],
      businessAddress: ['', Validators.required],
      accountType: ['', Validators.required],
      preferredBranch: ['', Validators.required]
    });
    this.busninessInfo.controls['name'].disable();
    this.getUserOtp();
    this.getUserOtpData();
    this.getCompany();
    this.getBvnDetails();
    this.getSalutation();
    this.getOccupationCatalogues();
    this.getBranches();
  }

  accountTypeChange (e) { if(this.accountTypeChange) { if(e) { this.sharedData.productCode = e.code; } } }

  expand() { if(!this.read) { this.read = true } else { this.read = false } }

  agreeToTermsChange(e) { this.agreeToTerms = e; }

  ngOnDestroy() {
    this.alive = false;
  }

}
