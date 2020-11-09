import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountCreationService } from './../../Services/account-creation.service';
import { takeWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanySearchService } from 'src/app/Services/company-search.service';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent implements OnInit, OnDestroy {
  alive: boolean;
  accountNumber: string;
  companyName: string;
  constructor( private accountService: AccountCreationService, private companySearchServ: CompanySearchService) {
    this.alive = true;
   }

  ngOnInit() {
    this.accountService.newAccountNumber$.pipe( takeWhile( () => this.alive) ).subscribe( res => {
      this.accountNumber = res;
    }, err => {
      console.log(err);
    });

    this.companySearchServ.companyName$.pipe(takeWhile( () => this.alive)).subscribe( res => {
      this.companyName = res;
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.companySearchServ.companyName.next(null);
  }
}
