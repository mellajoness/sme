import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedData } from './shared.components';
 // this includes the core NgIdleModule but includes keepalive providers for easy wireup



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    FormBuilder,
    SharedData,
  ]
  
})
export class SharedservicesModule { }
