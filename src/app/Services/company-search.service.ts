import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanySearchService {
  companyName = new BehaviorSubject(null);
  companyName$ = this.companyName.asObservable();
  salutation = new BehaviorSubject(null);
  salutation$ = this.salutation.asObservable();

  constructor ( private http: HttpClient) { }

  searchCompanyName(companyName): Observable<any> {
    const data = {
      CorporateAccountName: companyName
    }
    return this.http.post(`${environment.validateCompanyName}`, data, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${environment.apiPassword}:${environment.apiPassword}`)
      })
    } );
  }
}
