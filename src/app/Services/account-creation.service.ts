import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError, shareReplay } from 'rxjs/operators';

const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa(`${environment.apiPassword}:${environment.apiPassword}`),
});

@Injectable({
  providedIn: 'root'
})
export class AccountCreationService {
  newAccountNumber = new BehaviorSubject(null);
  newAccountNumber$ = this.newAccountNumber.asObservable();
  constructor(private http: HttpClient) { }

  createAccount(accountCreationDetails): Observable<any> {
    return this.http.post(environment.createAccount, accountCreationDetails, { headers })
      .pipe(
        catchError(this.handleError), shareReplay(1)
      );
  }

  getOccupations(): Observable<any> {
    return this.http.get(environment.getOccupationCatalogs, { headers })
    .pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    );
  }

  getBranches(): Observable<any> {
    return this.http.get(environment.getBranches, { headers })
    .pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    );
  }

  validateAccountCreation(payload): Observable<any> {
    return this.http.post(environment.validateAccountCreation, payload, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${environment.otpPassword}:${environment.otpPassword}`),
        'Content-Type' : 'application/json'
      })
    }).pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    );
  }

  createMandate(accountCreationDetails): Observable<any> {
    return this.http.post(environment.validateAccountNumber, accountCreationDetails, { headers })
      .pipe(
        catchError(this.handleError), shareReplay(1)
      );
  }


  validateSentOtp(accountCreationDetails): Observable<any> {
    return this.http.post(environment.validateOtp, accountCreationDetails, { headers })
      .pipe(
        catchError(this.handleError), shareReplay(1)
      );
  }


  uploadMandate(accountCreationDetails): Observable<any> {
    return this.http.post(environment.uploadSignature, accountCreationDetails, { headers })
      .pipe(
        catchError(this.handleError), shareReplay(1)
      );
  }

  validateReCaptchaToken(token: string): Observable<any> {

    let requestBody = {
      Token: token
    }

    return this.http.post(environment.validateReCaptchaToken, requestBody, {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    });
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
