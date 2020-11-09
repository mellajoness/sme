import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountCreationService } from 'src/app/Services/account-creation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { RefCodeService } from 'src/app/Services/ref-code.service';
import { CompanySearchService } from 'src/app/Services/company-search.service';
import { EncDecService } from 'src/app/Services/enc-dec.service';
import { environment } from 'src/environments/environment';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';

import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { AccountdetailsComponent } from '../accountdetails/accountdetails.component';
import { OtpmodalComponent } from '../otpmodal/otpmodal.component';
import { FailuremodalComponent } from '../failuremodal/failuremodal.component';
@Component({
  selector: 'app-updateaccount',
  templateUrl: './updateaccount.component.html',
  styleUrls: ['./updateaccount.component.scss'],
  animations: [
    trigger('fade', [
      transition( 'void => *', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class UpdateaccountComponent implements OnInit {
  animal: 'panda' | 'unicorn' | 'lion';
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
  constructor(private route: Router,
              private AccountService: AccountCreationService,
              private _formBuilder: FormBuilder,
              private refCodeServ: RefCodeService,
              private companyServ: CompanySearchService,
              private encDec: EncDecService,
              public sharedData: SharedData,
              private dialog:MatDialog
             
    ) { }

  ngOnInit() {
    this.refCodeform = this._formBuilder.group({
      refcode: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      // rcNumber: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])]
    });
    // this.checkForPersistedPersonalInfoData();
  }
  

  openDialog(){
    this.route.navigateByUrl('/Accountdetails' );
  }
  
  validateAccount() {
    // this.sharedData.productCode = null;
     this.setErrorMessage('');
    // const phoneNumber = this.refCodeform.value.refcode;
    const rcNumber = this.refCodeform.value.refcode;
    const payload = {
      // 'phoneNumber': phoneNumber,
      'accountNumber': rcNumber,
    };
    console.log('my body',payload)
    this.loading = true;
    this.AccountService.createMandate(payload).subscribe(res=>{
       console.log('my response',res)
       if (res.responseCode === '00') {
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.loading = false;
        this.dialog.open(OtpmodalComponent, {
          disableClose: true,
            data: {
              responseMessage: res.responseMessage,
              accountNumber:payload.accountNumber,
              otpId:res.data.otpId
            }
        }
        
          )
       }
       else{
        this.loading = false;
        this.dialog.open(FailuremodalComponent, {
            data: {
              responseMessage: res.responseMessage
            }
        }
        )
       }
      }
    )
    }

    setErrorMessage(message) {
      this.errorMessage = message;
      this.loading = false;
      this.resendingCode = false;
    }
    
}
