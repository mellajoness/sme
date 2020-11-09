import { Component, OnInit } from '@angular/core';
import { RefCodeService } from './Services/ref-code.service';
import { EncDecService } from './Services/enc-dec.service';
import { environment } from 'src/environments/environment';
import { CompanySearchService } from './Services/company-search.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'accountOpening';

  constructor (
    private refCodeServ: RefCodeService,
    private router: Router
    ) {
      const navEndEvents = router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      );
      navEndEvents.subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-67215532-6', {
          'page_path': event.urlAfterRedirects
        });
      });
  }

  // updateRefCodeStatus() {
  //   const refCode = JSON.parse(localStorage.getItem('Ref'));
  //   // tslint:disable-next-line: curly
  //   if (!refCode) return;
  //   const encryptedCode = this.encdec.encrypt(environment.key, refCode );
  //   this.refCodeServ.validateRefCode (
  //     {
  //       'otpCode': "956031",
  //       'decryptedOtpId': "LQIUd/zPsu9GkGKKwrErgA==",
  //       'otpId': "LQIUd/zPsu9GkGKKwrErgA=="
  //    }
  //     ).subscribe(response => {
  //     const { item1 } = response.data;
  //     this.refCodeServ.refCodeStatus.next(item1);
  //   });
  // }

  ngOnInit() {
      // this.updateRefCodeStatus();
  }
}
