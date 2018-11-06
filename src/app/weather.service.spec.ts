import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { asyncData, asyncError } from '../testing/async-observable-helpers';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

describe('WeatherService (with spies)', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  });
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    weatherService = new WeatherService(<any>httpClientSpy);
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('should return expected weather (HttpClient called once)', () => {
    const expectedWeather: Weather = {
      city: 'Eldoret',
      country: 'KE',
      date: 1539885600,
      humidity: 100,
      icon_id: 803,
      image: '04n',
      temperature: 288.15,
      description: 'broken clouds',
      wind_speed: 1.5,
      condition: 200
    };

    httpClientSpy.get.and.returnValue(asyncData(expectedWeather));

    weatherService.getCurrentWeather(this.city).subscribe(weather =>
      expect(weather).toEqual(expectedWeather, 'expected weather'), fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      weatherService.getCurrentWeather(this.city).subscribe(
        weather => fail('expected an error, not weather'),
        error => expect(error.message).toContain('test 404 error')
      );
  });
});

describe('WeatherService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ WeatherService ]
    });

    httpClient = TestBed.get(httpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    weatherService = TestBed.get(WeatherService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});


// import { TestBed } from '@angular/core/testing';

// import { Weather } from './weather';
// import { WeatherService } from './weather.service';

// describe('WeatherService', () => {
//   let service: WeatherService;
//   let httpClientSpy: { get: jasmine.Spy };
//   const city = 'Eldoret';

//   beforeEach(() => {
//     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//     service = new WeatherService(<any>httpClientSpy);
//     TestBed.configureTestingModule({
//       providers: [ WeatherService ]
//     });
//   });
// });


//   it('#getWeather should return a real value', () => {
//     const result = service.getCurrentWeather(city);
//     expect(result).toBe('real value');
//   });

//   it('#getWeather should return an observable of weather', () => {
//     service.getCurrentWeather(city).subscribe(weather => {
//       expect(weather).toBe('observable value');
//     });
//   });

//   it('#getWeather should return expected weather (HttpClient called once)', () => {
//     const expectedWeather: Weather[] = [
      
//     ]
//   });
// });
