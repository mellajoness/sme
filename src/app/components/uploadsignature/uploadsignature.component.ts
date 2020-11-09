import { Component, OnInit, Inject } from '@angular/core';
import * as _ from 'lodash';
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
import { SuccessmodalComponent } from '../successmodal/successmodal.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {EmptyimagemodalComponent} from '../emptyimagemodal/emptyimagemodal.component'


@Component({
  selector: 'app-uploadsignature',
  templateUrl: './uploadsignature.component.html',
  styleUrls: ['./uploadsignature.component.scss']
})
export class UploadsignatureComponent implements OnInit {

  fileToUpload: File = null;
  fileToUploadTwo: File=null;
  favoriteSeason: string;
  seasons: string[] = ['true',];
  previewUrl: string | ArrayBuffer;
  phoneNumber: any;
  accountNumber: any;
  imgOne:any;
  loading:boolean;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  mysentval: string | ArrayBuffer;
  userData: any;
  constructor(
               private AccountService: AccountCreationService,
              private _formBuilder: FormBuilder,
              private refCodeServ: RefCodeService,
              private dialog:MatDialog,
              private route: Router,
     )
      { }

  ngOnInit() {
     this.phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
     this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log('my phone',this.phoneNumber)
    console.log('user data',this.userData)
    console.log('eteteyteytetyete')
  }

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
// }

// handleFileInputTwo(files: FileList) {
//   let me =this
//   this.fileToUploadTwo = files.item(0);
//   let reader=new FileReader()
//   reader.readAsDataURL(this.fileToUploadTwo)
//   reader.onload=function(){
//     console.log(reader.result)
//   }
//   reader.onerror = function (error) {
//     console.log('Error: ', error);
//   };
  
// }





fileChangeEvent(fileInput: any) {
  this.imageError = null;
  this.fileToUploadTwo=fileInput.target.files[0]
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 240000;
      const allowed_types = ['image/png', 'image/jpeg','image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'kb';

          return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG | JPEG)';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              console.log(img_height, img_width);
              console.log(reader.result)
               this.mysentval =reader.result

              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

removeImage() {
  this.cardImageBase64 = null;
  this.isImageSaved = false;
}

uploadFileToActivity() {
  if(this.mysentval==null){
    this.dialog.open(EmptyimagemodalComponent, {
     
  })
  }

  else if(this.fileToUploadTwo.name===''){
    this.dialog.open(EmptyimagemodalComponent, {
     
  })
  }
  else{
  const payload = {
    "accountNumber": this.phoneNumber,
    "imageAccessCode": this.fileToUploadTwo.name,
    "imageData":   this.mysentval,
    "remarks": "string"
   
  };
  
  console.log('my body',payload)
  this.loading = true;
  this.AccountService.uploadMandate(payload).subscribe(resp => {
    console.log('data',resp)
    if(resp.responseCode==='00'){
      this.loading = false;
      this.route.navigateByUrl('/' );
    
    }
    else{
      this.dialog.open(FailuremodalComponent, {
        data: {
          responseMessage: resp.responseMessage
        }
    })
    }
    }, error => {
      console.log(error);
    });
}

}
}



