import { TestBed } from '@angular/core/testing';

import { TestWeatherService } from './test-weather.service';

describe('TestWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestWeatherService = TestBed.get(TestWeatherService);
    expect(service).toBeTruthy();
  });
});
