import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountCreationService } from 'src/app/Services/account-creation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { RefCodeService } from 'src/app/Services/ref-code.service';
import { CompanySearchService } from 'src/app/Services/company-search.service';
import { EncDecService } from 'src/app/Services/enc-dec.service';
import { environment } from 'src/environments/environment';
import { SharedData } from 'src/Business/Shared/sharedservices/shared.components';
import { FailuremodalComponent } from '../failuremodal/failuremodal.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AccountdetailsComponent } from '../accountdetails/accountdetails.component';
@Component({
  selector: 'app-otpmodal',
  templateUrl: './otpmodal.component.html',
  styleUrls: ['./otpmodal.component.scss'],
  animations: [
    trigger('fade', [
      transition( 'void => *', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class OtpmodalComponent implements OnInit {
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
  otpId: any;
  public product = { id:'1', name:"Angular"};
  userData: any;
  lastFourNumb: any;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialog,
    private route: Router,
              private AccountService: AccountCreationService,
              private _formBuilder: FormBuilder,
              private refCodeServ: RefCodeService,
              private companyServ: CompanySearchService,
              private encDec: EncDecService,
              public sharedData: SharedData,
  ) { }

  ngOnInit() {
    this.phoneNumber=this.data.accountNumber,
    this.otpId=this.data.otpId,
    this.userData = JSON.parse(localStorage.getItem('userData'));
    let numb=this.userData.phoneNumber.substr(-4)
    this.lastFourNumb =numb.substr(-4)
    console.log('last four',this.lastFourNumb)
    console.log('my phone modal',this.phoneNumber)
    console.log('my otpid modal',this.otpId)
    console.log('user data',this.userData)
    console.log('numb',numb)
    this.refCodeform = this._formBuilder.group({
      refcode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      
    
    });
   
  }
 



  cancel(){
    this.dialog.closeAll()
  }

  validateOtp() {
    const userOtp = this.refCodeform.value.refcode;
    // const otpId = JSON.parse(localStorage.getItem('Ref'));
    const payload = {
      'otpCode': userOtp,
      'decryptedOtpId': 'string',
      'otpId': this.otpId,
      "accountNumber":this.phoneNumber

    };
    localStorage.setItem('phoneNumber', JSON.stringify(this.phoneNumber));
   
    console.log('my body',payload)
    this.loading = true;
    this.refCodeServ.validateRefCode(payload).subscribe(res=>{
       console.log('my response',res)
       if (res.responseCode === '00') {
        this.loading = false;
        this.dialog.closeAll()
     

    
        this.route.navigateByUrl('Accountdetails', {
          
        });
       }
       else{
        this.loading = false;
        this.dialog.closeAll()
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


}
