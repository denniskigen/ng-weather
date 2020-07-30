import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { Weather, Forecast } from './weather-types';
import { WeatherService } from './weather.service';
import { mockCurrentWeather, mockFiveDayForecast } from './weather.mock';

describe('WeatherService ', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new WeatherService(httpClientSpy);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('has all its methods defined', () => {
    expect(service.getCurrentWeather).toBeDefined();
    expect(service.getFiveDayForecast).toBeDefined();
  });

  it('should return an observable response from fetching the current weather', (done: DoneFn) => {
    const city = 'Eldoret';
    httpClientSpy.get.and.returnValue(of(mockCurrentWeather));

    service.getCurrentWeather(city).subscribe(
      (data) => {
        expect(data).toEqual(mappedCurrentWeather, 'Current day forecast');
        expect(data.city).toEqual(mappedCurrentWeather.city);
        expect(data.condition).toEqual(mappedCurrentWeather.condition);
        expect(data.country).toEqual(mappedCurrentWeather.country);
        expect(data.date).toEqual(mappedCurrentWeather.date);
        expect(data.description).toEqual(mappedCurrentWeather.description);
        expect(data.humidity).toEqual(mappedCurrentWeather.humidity);
        expect(data.icon_id).toEqual(mappedCurrentWeather.icon_id);
        expect(data.image).toEqual(mappedCurrentWeather.image);
        expect(data.temperature).toEqual(mappedCurrentWeather.temperature);
        expect(data.wind_speed).toEqual(mappedCurrentWeather.wind_speed);
        expect(data.icon).toEqual(mappedCurrentWeather.icon);
        expect(data.min).toEqual(mappedCurrentWeather.min);
        expect(data.max).toEqual(mappedCurrentWeather.max);
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        done();
      },
      (err) => {
        console.error('test error: ', err);
        fail('expected weather data, not an error');
        done();
      }
    );
  });

  it('should throw an error when the API cannot be reached for current weather data', (done: DoneFn) => {
    const city = '@@@@@@';
    httpClientSpy.get.and.callFake(() => throwError(mockErrorResponse));

    service.getCurrentWeather(city).subscribe(
      () => fail('expected an error, not current weather data'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(500);
        expect(err.statusText).toEqual('An internal server error occurred');
        expect(err.error).toEqual('Internal Server Error');
        expect(err.message).toContain('500 An internal server error occurred');
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should return an observable response from fetching the five day weather forecast', (done: DoneFn) => {
    const city = 'Eldoret';
    httpClientSpy.get.and.returnValue(of(mockFiveDayForecast));

    service.getFiveDayForecast(city).subscribe(
      (forecast) => {
        expect(forecast).toBeDefined();
        expect(forecast.length).toEqual(5, 'Five day forecast');
        expect(forecast[0]).toEqual(mappedFiveDayForecast[0]);
        expect(forecast[1]).toEqual(mappedFiveDayForecast[1]);
        expect(forecast[2]).toEqual(mappedFiveDayForecast[2]);
        expect(forecast[3]).toEqual(mappedFiveDayForecast[3]);
        expect(forecast[4]).toEqual(mappedFiveDayForecast[4]);
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        done();
      },
      (err) => {
        console.error('test error: ', err);
        fail('expected weather data, not an error');
      }
    );
  });

  it('should throw an error when the API cannot be reached for forecast data', (done: DoneFn) => {
    const city = '@@@@@@';
    httpClientSpy.get.and.callFake(() => throwError(mockErrorResponse));

    service.getFiveDayForecast(city).subscribe(
      () => fail('expected an error, not forecast data'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(500);
        expect(err.statusText).toEqual('An internal server error occurred');
        expect(err.error).toEqual('Internal Server Error');
        expect(err.message).toContain('500 An internal server error occurred');
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });
});

const mappedCurrentWeather: Weather = {
  city: 'Eldoret',
  country: 'KE',
  date: 1559675580000,
  humidity: 88,
  icon: '04n',
  icon_id: 803,
  image: 'https://openweathermap.org/img/w/04n.png',
  temperature: 17,
  description: 'broken clouds',
  wind_speed: 4,
  condition: 200,
  max: 22,
  min: 13,
};

const mappedFiveDayForecast: Forecast[] = [
  {
    date: 1559725200000,
    description: 'few clouds',
    dt_txt: '2019-06-05 09:00:00',
    humidity: 67,
    icon: '02d',
    icon_id: 801,
    image: 'https://openweathermap.org/img/w/02d.png',
    max: 21.53,
    min: 12.98,
    temperature: 21.53,
    wind_speed: 10,
  },
  {
    date: 1559811600000,
    description: 'few clouds',
    dt_txt: '2019-06-06 09:00:00',
    humidity: 60,
    icon: '02d',
    icon_id: 801,
    image: 'https://openweathermap.org/img/w/02d.png',
    max: 22.28,
    min: 13.44,
    temperature: 22.28,
    wind_speed: 8,
  },
  {
    date: 1559898000000,
    description: 'scattered clouds',
    dt_txt: '2019-06-07 09:00:00',
    humidity: 62,
    icon: '03d',
    icon_id: 802,
    image: 'https://openweathermap.org/img/w/03d.png',
    max: 22.65,
    min: 13.41,
    temperature: 22.65,
    wind_speed: 7,
  },
  {
    date: 1559984400000,
    description: 'light rain',
    dt_txt: '2019-06-08 09:00:00',
    humidity: 68,
    icon: '10d',
    icon_id: 500,
    image: 'https://openweathermap.org/img/w/10d.png',
    max: 21.36,
    min: 12.88,
    temperature: 21.36,
    wind_speed: 7,
  },
  {
    date: 1560070800000,
    description: 'broken clouds',
    dt_txt: '2019-06-09 09:00:00',
    humidity: 66,
    icon: '04d',
    icon_id: 803,
    image: 'https://openweathermap.org/img/w/04d.png',
    max: 21.27,
    min: 12.77,
    temperature: 21.27,
    wind_speed: 6,
  },
];

const mockErrorResponse = new HttpErrorResponse({
  error: 'Internal Server Error',
  status: 500,
  statusText: 'An internal server error occurred',
});
