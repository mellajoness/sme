import { Injectable } from '@angular/core';
import { RefCodeService } from './ref-code.service';
import { CompanySearchService } from 'src/app/Services/company-search.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private refCodeServ: RefCodeService, private companyNameServ: CompanySearchService) { }
  get isRefCodeValid() {
    let isValid: boolean;
    this.refCodeServ.refCodeStatus$.subscribe(status => {
      if (status) {
        status ? isValid = true : isValid = false;
      } else {
        isValid = false;
      }
    });
    return isValid;
  }

  get isCompnayNameavailable() {
    let validName: boolean;
    this.companyNameServ.companyName$.subscribe(name => {
      if (name) {
        validName = true;
      } else {
        validName = false;
      }
    });
    return validName;
  }
}
