import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UpdateaccountComponent } from '../updateaccount/updateaccount.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
  
@Component({
  selector: 'app-failuremodal',
  templateUrl: './failuremodal.component.html',
  styleUrls: ['./failuremodal.component.scss']
})
export class FailuremodalComponent implements OnInit {
  Message: string;

  constructor(@Inject(MAT_DIALOG_DATA) 
              public data: any) {}

  ngOnInit() {
   this.Message=this.data.responseMessage
    console.log('failure modal',this.data)
  }

}
