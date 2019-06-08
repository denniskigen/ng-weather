import { TestBed } from '@angular/core/testing';

import { TestApiService } from './test-api.service';

describe('TestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestApiService = TestBed.get(TestApiService);
    expect(service).toBeTruthy();
  });
});
