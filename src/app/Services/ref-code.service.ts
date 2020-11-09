import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa(`${environment.otpPassword}:${environment.otpPassword}`)
});
@Injectable({
  providedIn: 'root'
})
export class RefCodeService {
  refCodeStatus = new BehaviorSubject(null);
  refCodeStatus$ = this.refCodeStatus.asObservable();
  refCode = new BehaviorSubject(null);
  refCode$ = this.refCode.asObservable();
  refCodeData = new BehaviorSubject(null);
  refCodeData$ = this.refCodeData.asObservable();

  constructor(private http: HttpClient) { }

  getRefCode(payload): Observable<any> {
    return this.http.post(environment.getRefCode, payload, { headers })
    .pipe(
      retry(3), catchError(this.handleError)
    );
  }

  validateRefCode(refCode): Observable<any> {
    return this.http.post(environment.validateRefCode, refCode, { headers })
    .pipe(
      retry(3), catchError(this.handleError)
    );
  }

  validateNewOtp(refCode): Observable<any> {
    return this.http.post(environment.validateOtp, refCode, { headers })
    .pipe(
      retry(3), catchError(this.handleError)
    );
  }



  handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
