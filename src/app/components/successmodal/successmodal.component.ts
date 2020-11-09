import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.component.html',
  styleUrls: ['./successmodal.component.scss']
})
export class SuccessmodalComponent implements OnInit {
  Message: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) 
              public data: any,
              private route: Router,
              private dialog:MatDialog,
              ) {}
     
  ngOnInit() {
   this.Message=this.data.responseMessage
    console.log('suceeesss modal',this.data)
  }

  signature(){
    this.dialog.closeAll()
    this.route.navigateByUrl('/Uploadsignature' );
  }
  
}