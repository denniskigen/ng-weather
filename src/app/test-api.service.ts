import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
/**
 * FakeApiService pretends to make real http requests.
 * implements only as much of HeroService as is actually consumed by the app
*/
export class TestApiService extends ApiService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  lastResult!: Observable<any>;
  activities = {
    activities: [
      { id: 1, name: 'Dancing' },
      { id: 2, name: 'Kayaking' },
      { id: 3, name: 'Cycling' },
      { id: 4, name: 'Reading' }
    ]
  };
  moods = {
    moods: [
      { id: 1, name: 'Happy' },
      { id: 2, name: 'Melancholy' },
      { id: 3, name: 'Downbeat' },
      { id: 4, name: 'Cheerful' }
    ]
  };

  getActivities(): Observable<any> {
    return this.lastResult = of(this.activities);
  }

  getMoods(): Observable<any> {
    return this.lastResult = of(this.moods);
  }
}
