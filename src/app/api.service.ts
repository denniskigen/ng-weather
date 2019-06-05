import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private activitiesUrl = 'http://localhost:8080/api/activities';
  private moodsUrl = 'http://localhost:8080/api/moods';

  constructor(private http: HttpClient) { }

  getActivities(): Observable<any> {
    return this.http.get(this.activitiesUrl)
      .pipe(catchError(this.handleError));
  }

  createActivity(activity: any): Observable<any> {
    return this.http.post(this.activitiesUrl, activity, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getMoods(): Observable<any> {
    return this.http.get(this.moodsUrl)
      .pipe(catchError(this.handleError));
  }

  deleteActivity(id: number): Observable<{}> {
    const url = `${this.activitiesUrl}/${id}`;

    return this.http.delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteMood(id: number): Observable<{}> {
    const url = `{this.moodsUrl}/${id}`;

    return this.http.delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createMood(mood: any): Observable<any> {
    return this.http.post(this.moodsUrl, mood, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(error);
    }
  }
}
