import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { retry, catchError, shareReplay, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BvnService {
  bvnDetails = new BehaviorSubject(null);
  bvnDetails$ = this.bvnDetails.asObservable();

  constructor(private http: HttpClient) { }

  verifyBvn(payload): Observable<any> {
    return this.http.post(environment.verifyBvn, payload, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${environment.apiPassword}:${environment.apiPassword}`)
      })
    }).pipe(
      retry(3), catchError(this.handleError), shareReplay(1)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
