import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { of, throwError } from 'rxjs';

import { WeatherComponent } from './weather.component';
import { WeatherService } from '../weather.service';
import {
  searchWeatherResult,
  testCurrentWeather,
  testFiveDayForecast,
} from '../weather.mock';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';

import { RoundTemperaturePipe } from '../round-temperature.pipe';
import { HttpErrorResponse } from '@angular/common/http';

const weatherServiceStub = {
  getCurrentWeather: () => of(testCurrentWeather),
  getFiveDayForecast: () => of(testFiveDayForecast),
};

const serverError = new HttpErrorResponse({
  error: { cod: 500, message: 'Internal Server Error' },
  status: 500,
  statusText: 'An internal server error occurred',
  url: '',
});

const notFoundError = new HttpErrorResponse({
  error: { cod: '404', message: 'city not found' },
  status: 404,
  statusText: 'Not Found',
  url:
    'https://api.openweathermap.org/data/2.5/forecast/?q=ryo%20de%20janeiro&units=metric&APPID=baedc2f2f31b7b3303e5d42d88d283c3',
});

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let service: WeatherService;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  const defaultCity = 'Eldoret';
  const locale = 'en-US';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [WeatherComponent, RoundTemperaturePipe],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(WeatherService);
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have weather data immediately after the component is constructed', () => {
    expect(component.weather).not.toBeTruthy();
    expect(component.forecast.length).not.toBeGreaterThan(0, 'No forecasts');
  });

  it('should display the current weather, five day forecast and recommendation after the component initializes', () => {
    const getWeatherSpy = spyOn(component, 'getWeather').and.callThrough();
    const getForecastSpy = spyOn(component, 'getForecast').and.callThrough();

    expect(component.city).toEqual(defaultCity, 'default city');
    fixture.detectChanges();
    expect(getWeatherSpy).toHaveBeenCalledTimes(1);
    expect(getWeatherSpy).toHaveBeenCalledWith(defaultCity);
    expect(getForecastSpy).toHaveBeenCalledTimes(1);
    expect(getForecastSpy).toHaveBeenCalledWith(defaultCity);
    expect(component.city).toEqual(defaultCity, 'default city');
    fixture.detectChanges();
    const cardTitle = <HTMLElement>nativeEl.querySelector('mat-card-title');
    const cardSubtitles = nativeEl.querySelectorAll('mat-card-subtitle');
    const temp = <HTMLElement>nativeEl.querySelector('.large.temp');
    const recommendation = <HTMLElement>(
      nativeEl.querySelector('.recommendation')
    );
    const forecastItems = nativeEl.querySelectorAll('mat-list-item.forecast');
    const weatherIcon = <HTMLElement>nativeEl.querySelector('.huge.my-wi');

    expect(cardTitle.innerHTML).toContain(
      testCurrentWeather.city + ', ' + testCurrentWeather.country
    );
    expect(cardSubtitles[0].innerHTML).toContain(
      formatDate(testCurrentWeather.date, 'EEEE', locale)
    );
    expect(cardSubtitles[0].innerHTML).toContain(
      formatDate(testCurrentWeather.date, 'shortTime', locale)
    );
    expect(cardSubtitles[0].innerHTML).toContain(
      titleCase(testCurrentWeather.description)
    );
    expect(cardSubtitles[1].innerHTML).toContain(
      testCurrentWeather.wind_speed + ' km/h Winds'
    );
    expect(cardSubtitles[1].innerHTML).toContain(
      testCurrentWeather.humidity + '% Humidity'
    );
    expect(temp.innerHTML).toBe(testCurrentWeather.temperature + '°C');
    expect(recommendation.innerHTML).toMatch(
      recommendations['default'][testCurrentWeather.icon_id].recommendation
    );
    expect(recommendation.innerHTML).toMatch(
      /'Netflix and chill' weather. It's pleasant outside/
    );
    expect(weatherIcon.className).toContain(
      'wi wi-' + weatherIcons['default'][testCurrentWeather.icon_id].icon
    );
    expect(forecastItems.length).toEqual(5);
  });

  it('should show the current weather for the default city as well as a recommendation based on the weather', () => {
    const getWeatherSpy = spyOn(component, 'getWeather').and.callThrough();

    expect(component.city).toEqual('Eldoret', 'default city');
    component.getWeather(component.city);
    expect(getWeatherSpy).toHaveBeenCalledTimes(1);
    expect(getWeatherSpy).toHaveBeenCalledWith(defaultCity);
    expect(component.weather).toBeDefined();
    expect(component.weather?.city).toEqual(defaultCity);
    expect(component.weather?.condition).toEqual(testCurrentWeather.condition);
    expect(component.weather?.country).toEqual(testCurrentWeather.country);
    expect(component.weather?.description).toEqual(
      testCurrentWeather.description
    );
    expect(component.weather?.humidity).toEqual(testCurrentWeather.humidity);
    expect(component.weather?.max).toEqual(testCurrentWeather.max);
    expect(component.weather?.min).toEqual(testCurrentWeather.min);
    expect(component.weather?.temperature).toEqual(
      testCurrentWeather.temperature
    );
    expect(component.weather?.wind_speed).toEqual(
      testCurrentWeather.wind_speed
    );
    expect(component.recommendation).toMatch(
      /'Netflix and chill' weather. It's pleasant outside/
    );
    expect(component.icon).toEqual('wi wi-day-cloudy-gusts');
  });

  it('should show the five day forecast for the default city', () => {
    const getForecastSpy = spyOn(component, 'getForecast').and.callThrough();

    expect(component.city).toEqual(defaultCity, 'default city');
    component.getForecast(component.city);
    expect(getForecastSpy).toHaveBeenCalledTimes(1);
    expect(getForecastSpy).toHaveBeenCalledWith(defaultCity);
    expect(component.forecast).toBeDefined();
    expect(component.forecast.length).toEqual(
      testFiveDayForecast.length,
      'Five forecast items'
    );
    expect(component.forecast[0].description).toEqual('few clouds');
    expect(component.forecast[0].max).toEqual(21.53);
    expect(component.forecast[0].min).toEqual(12.98);
    expect(component.forecast[1].description).toEqual('few clouds');
    expect(component.forecast[1].max).toEqual(22.28);
    expect(component.forecast[1].min).toEqual(13.44);
    expect(component.forecast[2].description).toEqual('scattered clouds');
    expect(component.forecast[2].max).toEqual(22.65);
    expect(component.forecast[2].min).toEqual(13.41);
    expect(component.forecast[3].description).toEqual('light rain');
    expect(component.forecast[3].max).toEqual(21.36);
    expect(component.forecast[3].min).toEqual(12.88);
    expect(component.forecast[4].description).toEqual('broken clouds');
    expect(component.forecast[4].max).toEqual(21.27);
    expect(component.forecast[4].min).toEqual(12.77);
  });

  it('should show the current weather and forecast for a valid city when it is typed into the search input', () => {
    spyOn(service, 'getCurrentWeather').and.callFake(() =>
      of(searchWeatherResult.weather)
    );
    spyOn(service, 'getFiveDayForecast').and.callFake(() =>
      of(searchWeatherResult.forecast)
    );
    const searchWeatherSpy = spyOn(component, 'searchWeather');
    expect(component.city).toEqual(defaultCity);
    fixture.detectChanges();
    const searchInput = <HTMLInputElement>(
      nativeEl.querySelector('input.search')
    );
    const cardTitle = <HTMLElement>nativeEl.querySelector('mat-card-title');
    const cardSubtitles = nativeEl.querySelectorAll('mat-card-subtitle');
    const temp = <HTMLElement>nativeEl.querySelector('.large.temp');
    const recommendation = <HTMLElement>(
      nativeEl.querySelector('.recommendation')
    );
    const forecastItems = nativeEl.querySelectorAll('mat-list-item.forecast');
    searchInput.value = 'Rio De Janeiro';
    searchInput.dispatchEvent(newEvent('input'));
    spyOn(component, 'getWeather').and.callThrough();
    spyOn(component, 'getForecast').and.callThrough();

    expect(component.weather).toEqual(searchWeatherResult.weather);
    expect(component.forecast).toEqual(searchWeatherResult.forecast);
    expect(component.error).toEqual(null);
    expect(searchInput.value).toEqual('Rio De Janeiro');
    expect(searchWeatherSpy).toHaveBeenCalledTimes(1);
    expect(cardTitle.innerHTML).toMatch(/Rio de Janeiro, BR/);
    expect(cardTitle.innerHTML).toContain(
      searchWeatherResult.weather.city +
        ', ' +
        searchWeatherResult.weather.country
    );
    expect(cardSubtitles[0].innerHTML).toContain(
      formatDate(searchWeatherResult.weather.date, 'EEEE', locale)
    );
    expect(cardSubtitles[0].innerHTML).toContain(
      formatDate(searchWeatherResult.weather.date, 'shortTime', locale)
    );
    expect(cardSubtitles[0].innerHTML).toContain(
      titleCase(searchWeatherResult.weather.description)
    );
    expect(cardSubtitles[1].innerHTML).toContain(
      searchWeatherResult.weather.wind_speed + ' km/h Winds'
    );
    expect(cardSubtitles[1].innerHTML).toContain(
      searchWeatherResult.weather.humidity + '% Humidity'
    );
    expect(temp.innerHTML).toBe(
      Math.round(searchWeatherResult.weather.temperature) + '°C'
    );
    expect(recommendation.innerHTML).toEqual(
      'Great day for a bit of laundry and maybe a nice picnic date later :)'
    );
    expect(forecastItems.length).toEqual(
      searchWeatherResult.forecast.length,
      'Five day forecast'
    );
  });

  it('should throw an error when the city being searched for is invalid', () => {
    fixture.detectChanges();
    expect(component.error).toBeFalsy('No error');
    const getWeatherSpy = spyOn(component, 'getWeather');
    getWeatherSpy.and.callThrough();
    const getCurrentWeatherSpy = spyOn(service, 'getCurrentWeather');
    getCurrentWeatherSpy.and.returnValue(throwError(notFoundError));
    const getForecastSpy = spyOn(component, 'getForecast');
    getForecastSpy.and.callThrough();
    const getFiveDayForecastSpy = spyOn(service, 'getFiveDayForecast');
    getFiveDayForecastSpy.and.returnValue(throwError(notFoundError));
    component.getWeather(defaultCity);
    component.getForecast(defaultCity);
    expect(component.error).toBeTruthy();
    fixture.detectChanges();
    const err = <HTMLElement>nativeEl.querySelector('.err');
    expect(err.textContent).toContain('404: city not found');
  });

  it('should throw an error when the current weather and forecast cannot be retrieved', () => {
    fixture.detectChanges();
    const getWeatherSpy = spyOn(component, 'getWeather');
    getWeatherSpy.and.callThrough();
    const getCurrentWeatherSpy = spyOn(service, 'getCurrentWeather');
    getCurrentWeatherSpy.and.returnValue(throwError(serverError));
    const getForecastSpy = spyOn(component, 'getForecast');
    getForecastSpy.and.callThrough();
    const getFiveDayForecastSpy = spyOn(service, 'getFiveDayForecast');
    getFiveDayForecastSpy.and.returnValue(throwError(serverError));
    component.getWeather(defaultCity);
    component.getForecast(defaultCity);
    expect(component.error).toBeTruthy();

    fixture.detectChanges();
    const err = <HTMLElement>nativeEl.querySelector('.err');
    expect(err.textContent).toContain('500: Internal Server Error');
  });
});

// Helpers
function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

function titleCase(word: string) {
  const result = word.replace(/\w\S*/g, (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
  return result;
}
