import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestWeatherService } from './test-weather.service';

describe('TestWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: TestWeatherService = TestBed.get(TestWeatherService);
    expect(service).toBeTruthy();
  });
});
