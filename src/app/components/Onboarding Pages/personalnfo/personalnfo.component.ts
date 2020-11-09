import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BvnService } from 'src/app/Services/bvn-service.service';
import { takeWhile } from 'rxjs/operators';
import { PersonalInfo } from 'src/app/Models/customerPersonalInfo';
import { RefCodeService } from 'src/app/Services/ref-code.service';
import { transition, trigger, style, animate } from '@angular/animations';
import { CompanySearchService } from 'src/app/Services/company-search.service';
import { AccountCreationService } from 'src/app/Services/account-creation.service';

@Component({
  selector: 'app-personalnfo',
  templateUrl: './personalnfo.component.html',
  styleUrls: ['./personalnfo.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(4000)
      ])
    ])
  ]
})
export class PersonalnfoComponent implements OnInit, OnDestroy {
  recaptcha: string;
  recaptchaIsValid: boolean;
  personalDetailsForm: FormGroup;
  personalInfo: PersonalInfo;
  alive: boolean;
  showSuccessAlert: boolean;
  loading: boolean;
  errorMessage: string;
  companyName: string;
  titles = [
    'Mr', 'Mrs', 'Miss', 'Alhaji', 'Alhaja', 'Chief', 'Doctor', 'Sir'
  ];
  networkErrorMessage = 'Reference code could not be generated, please check your internet connection';
  constructor(
    private service: AccountCreationService,
    private _formBuilder: FormBuilder,
    private route: Router,
    private bvnService: BvnService,
    private refCodServ: RefCodeService,
    private companyNameServ: CompanySearchService
  ) {
    this.alive = true;
    this.showSuccessAlert = false;
    this.loading = false;
  }

  navigate() {
    this.route.navigateByUrl('/search');
  }

  getCustomerBvnDetails() {
    this.bvnService.bvnDetails$.pipe(takeWhile(() => this.alive)).subscribe(customerDetails => {
      if (customerDetails !== null) {
        const { firstName, lastName, email, phoneNumber } = customerDetails;
        this.personalInfo = {
          firstName, lastName, email, phoneNumber
        };
        this.setPersonalInfoFormValues();
      }
    });
    return;
  }

  getCompanyName() {
    this.companyNameServ.companyName$.pipe(takeWhile(() => this.alive)).subscribe(companyName => {
      if (companyName !== null) {
        this.companyName = companyName;
      }
    });
    return;
  }

  submitTogetRefCode() {
    this.loading = true;
    let requestPayload;
    if (this.personalInfo) {
      requestPayload = this.personalInfo;
      requestPayload.phoneNumber = this.personalDetailsForm.value.phoneNumber;
      requestPayload.salutation = this.personalDetailsForm.value.title;
      requestPayload.otp = 'string';
      requestPayload.businessName = this.companyName;
    } else {
      requestPayload = {
        'firstName': this.personalDetailsForm.value.firstName,
        'lastName': this.personalDetailsForm.value.lastName,
        'email': this.personalDetailsForm.value.email,
        'phoneNumber': this.personalDetailsForm.value.phoneNumber,
        'salutation': this.personalDetailsForm.value.title,
        'businessName': this.companyName,
        'otp': 'string',
        'otpId': 'string'
      };
    }

    this.refCodServ.getRefCode(requestPayload).subscribe(response => {
      this.loading = false;
      if (Object.keys(response).length > 0) {
        if (response.responseCode === '00' && response.data !== 'Validation Unsuccessful') {
          sessionStorage.setItem('Personal Info', JSON.stringify(requestPayload));
          localStorage.setItem('Ref', JSON.stringify(response.data));
          this.route.navigateByUrl('/refcode');
        } else if (response.responseCode === '99') {
          this.setErrorMessage(this.networkErrorMessage);
        }
      } else {
        this.setErrorMessage(this.networkErrorMessage);
      }
    }, err => {
      this.setErrorMessage(this.networkErrorMessage);
    });
  }

  setPersonalInfoFormValues() {
    const { firstName, lastName, email, phoneNumber } = this.personalInfo;
    // Set the values for the form
    this.personalDetailsForm.controls['firstName'].setValue(firstName);
    this.personalDetailsForm.controls['lastName'].setValue(lastName);
    this.personalDetailsForm.controls['phoneNumber'].setValue(phoneNumber);
    this.personalDetailsForm.controls['email'].setValue(email);
    // Disable the form fields
    this.personalDetailsForm.controls['firstName'].disable();
    this.personalDetailsForm.controls['lastName'].disable();
    this.personalDetailsForm.controls['email'].disable();
  }

  setErrorMessage(message) {
    this.errorMessage = message;
    this.loading = false;
  }

  // reCaptcha validation
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;

    // Call backend API to validate token
    this.service.validateReCaptchaToken(this.recaptcha).subscribe(
      res => {
        if (res.responseMessage === 'Successful') {
          this.recaptchaIsValid = true;
        } else {
          this.recaptchaIsValid = false;
        }
      }
    );
  }


  ngOnInit() {
    this.personalDetailsForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      title: ['', Validators.required],
      tandC: ['', Validators.required]
    });
    this.getCustomerBvnDetails();
    this.getCompanyName();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
