import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestApiService } from './test-api.service';

describe('TestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: TestApiService = TestBed.get(TestApiService);
    expect(service).toBeTruthy();
  });
});
