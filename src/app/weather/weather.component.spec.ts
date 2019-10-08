import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { WeatherComponent } from './weather.component';
import { ApiService } from '../api.service';
import { WeatherService } from '../weather.service';
import {
  searchWeatherResult, testCurrentWeather, testFiveDayForecast,
  testActivities, testMoods
} from '../weather.mock';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';

import { CapitalizePipe } from '../capitalize.pipe';
import { RoundTemperaturePipe } from '../round-temperature.pipe';

const mock404ErrorResponse = new HttpErrorResponse({
  error: {
    cod: '404',
    message: 'city not found'
  },
  status: 404,
  statusText: 'Not Found'
});

const weatherServiceStub = {
  getCurrentWeather: () => of(testCurrentWeather),
  getFiveDayForecast: () => of(testFiveDayForecast)
};

const apiServiceStub = {
  getActivities: () => of(testActivities),
  getMoods: () => of(testMoods),
  createActivity: (activity: any) => of({
    id: testActivities.length + 1,
    name: activity.name
  }),
  createMood: (mood: any) => of({
    id: testMoods.length + 1,
    name: mood.name
  })
};

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let service: WeatherService;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  const defaultCity = 'Eldoret';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        WeatherComponent,
        CapitalizePipe,
        RoundTemperaturePipe
      ],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceStub
        },
        {
          provide: WeatherService,
          useValue: weatherServiceStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(WeatherService);
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
    expect(component.weather).not.toBeDefined();
    expect(component.forecast.length).not.toBeGreaterThan(0, 'No forecasts');
  });

  it('should display the current weather, five day forecast, recommendation, activities and moods after the component initializes', () => {
    const getWeatherSpy = spyOn(component, 'getWeather').and.callThrough();
    const getForecastSpy = spyOn(component, 'getForecast').and.callThrough();
    const getActivitiesSpy = spyOn(component, 'getActivities').and.callThrough();
    const getMoodsSpy = spyOn(component, 'getMoods').and.callThrough();

    expect(component.city).toEqual(defaultCity, 'default city');
    fixture.detectChanges();
    expect(getWeatherSpy).toHaveBeenCalledTimes(1);
    expect(getWeatherSpy).toHaveBeenCalledWith(defaultCity);
    expect(getForecastSpy).toHaveBeenCalledTimes(1);
    expect(getForecastSpy).toHaveBeenCalledWith(defaultCity);
    expect(getActivitiesSpy).toHaveBeenCalledTimes(1);
    expect(getMoodsSpy).toHaveBeenCalledTimes(1);
    expect(component.city).toEqual('Eldoret', 'default city');
    fixture.detectChanges();
    const cardTitle = <HTMLElement>nativeEl.querySelector('mat-card-title');
    const cardSubtitles = nativeEl.querySelectorAll('mat-card-subtitle');
    const temp = <HTMLElement>nativeEl.querySelector('.large.temp');
    const recommendation = <HTMLElement>nativeEl.querySelector('.recommendation');
    const forecastItems = nativeEl.querySelectorAll('mat-list-item.forecast');
    const activityItems = nativeEl.querySelectorAll('.activity');
    const moodItems = nativeEl.querySelectorAll('.mood');
    const weatherIcon = <HTMLElement>nativeEl.querySelector('.huge.my-wi');

    expect(cardTitle.innerHTML).toMatch(/Eldoret, KE/);
    expect(cardSubtitles[0].innerHTML).toContain('Tuesday, 10:13 PM');
    expect(cardSubtitles[0].innerHTML).toContain('Broken Clouds');
    expect(cardSubtitles[1].innerHTML).toContain('4 km/h Winds');
    expect(cardSubtitles[1].innerHTML).toContain('88% Humidity');
    expect(temp.innerHTML).toMatch(/17°C/);
    expect(recommendation.innerHTML).toMatch(
      recommendations.default[component.weather.icon_id].recommendation
    );
    expect(recommendation.innerHTML).toMatch(/'Netflix and chill' weather. It's pleasant outside/);
    expect(forecastItems.length).toEqual(5, 'Five day forecast');
    expect(moodItems.length).toEqual(4, 'Four mood items');
    expect(activityItems.length).toEqual(4, 'Four activity items');
    expect(weatherIcon.className).toContain('wi wi-' + weatherIcons.default[component.weather.icon_id].icon);
  });

  it('should show the current weather for the default city as well as a recommendation based on the weather', () => {
    const getWeatherSpy = spyOn(component, 'getWeather').and.callThrough();

    expect(component.city).toEqual('Eldoret', 'default city');
    component.getWeather(component.city);
    expect(getWeatherSpy).toHaveBeenCalledTimes(1);
    expect(getWeatherSpy).toHaveBeenCalledWith(defaultCity);
    expect(component.weather).toBeDefined();
    expect(component.weather.city).toEqual(defaultCity);
    expect(component.weather.condition).toEqual(200);
    expect(component.weather.country).toEqual('KE');
    expect(component.weather.description).toEqual('broken clouds');
    expect(component.weather.humidity).toEqual(88);
    expect(component.weather.max).toEqual(22);
    expect(component.weather.min).toEqual(13);
    expect(component.weather.temperature).toEqual(17);
    expect(component.weather.wind_speed).toEqual(4);
    expect(component.recommendation).toMatch(/'Netflix and chill' weather. It's pleasant outside/);
    expect(component.icon).toEqual('wi wi-day-cloudy-gusts');
  });

  it('should show the five day forecast for the default city', () => {
    const getForecastSpy = spyOn(component, 'getForecast').and.callThrough();

    expect(component.city).toEqual(defaultCity, 'default city');
    component.getForecast(component.city);
    expect(getForecastSpy).toHaveBeenCalledTimes(1);
    expect(getForecastSpy).toHaveBeenCalledWith(defaultCity);
    expect(component.forecast).toBeDefined();
    expect(component.forecast.length).toEqual(5);
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
    expect(component.city).toEqual(defaultCity);
    fixture.detectChanges();
    const searchInput = <HTMLInputElement>nativeEl.querySelector('input.search');
    const cardTitle = <HTMLElement>nativeEl.querySelector('mat-card-title');
    const cardSubtitles = nativeEl.querySelectorAll('mat-card-subtitle');
    const temp = <HTMLElement>nativeEl.querySelector('.large.temp');
    const recommendation = <HTMLElement>nativeEl.querySelector('.recommendation');
    const forecastItems = nativeEl.querySelectorAll('mat-list-item.forecast');

    searchInput.value = 'Rio De Janeiro';
    searchInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    expect(searchInput.value).toEqual('Rio De Janeiro');
    spyOn(component, 'searchWeather').and.callFake(() => {
      component.weather = searchWeatherResult.weather;
      component.forecast = searchWeatherResult.forecast;
    });
    // search weather
    component.searchWeather();
    fixture.detectChanges();
    expect(cardTitle.innerHTML).toMatch(/Rio de Janeiro, BR/);
    expect(cardSubtitles[0].innerHTML).toContain('Saturday, 12:09 PM');
    expect(cardSubtitles[0].innerHTML).toContain('Few Clouds');
    expect(cardSubtitles[1].innerHTML).toContain('13 km/h Winds');
    expect(cardSubtitles[1].innerHTML).toContain('94% Humidity');
    expect(temp.innerHTML).toMatch(/18°C/);
    expect(recommendation.innerHTML).toMatch(/'Netflix and chill' weather. It's pleasant outside/);
    expect(forecastItems.length).toEqual(5, 'Five day forecast');
  });

  it('should throw an error when the city being searched for is invalid', () => {
    fixture.detectChanges();
    const searchInput = <HTMLInputElement>nativeEl.querySelector('input.search');

    searchInput.value = 'Ryo De Janero';
    searchInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    expect(searchInput.value).toEqual('Ryo De Janero');
    spyOn(component, 'searchWeather').and.callFake(() => {
      component.error = mock404ErrorResponse.error;
    });
    // search weather
    component.searchWeather();
    fixture.detectChanges();
    const err = <HTMLElement>nativeEl.querySelector('.err');
    expect(err.textContent).toContain('City not found');
  });

  it('should throw an error when the current weather and forecast cannot be retrieved', () => {
    fixture.detectChanges();
    spyOn(component, 'getWeather').and.callFake(() => {
      component.error = new HttpErrorResponse({
        status: 500,
        statusText: 'Server Error',
        error: {
          status: 500,
          message: 'Could not fetch weather data from server'
        }
      });
    });

    spyOn(component, 'getForecast').and.callFake(() => {
      component.error = new HttpErrorResponse({
        statusText: 'Server Error',
        error: {
          status: 500,
          message: 'Could not fetch forecast data from server'
        }
      });
    });

    component.getWeather(defaultCity);
    fixture.detectChanges();
    expect(component.error).toBeDefined();
    expect(component.error.error.message).toEqual('Could not fetch weather data from server');
    const weatherErrMsg = <HTMLElement>nativeEl.querySelector('mat-error.err');
    expect(weatherErrMsg.textContent).toMatch(/Http failure response/);
    component.getForecast(defaultCity);
    fixture.detectChanges();
    expect(component.error).toBeDefined();
    expect(component.error.error.message).toEqual('Could not fetch forecast data from server');
    const forecastErrMsg = <HTMLElement>nativeEl.querySelector('mat-error.err');
    expect(forecastErrMsg.textContent).toMatch(/Http failure response/);
  });

  it('should throw an error when moods or activities cannot be retrieved from the database', () => {
    fixture.detectChanges();
    spyOn(component, 'getActivities').and.callFake(() => {
      component.activitiesErr = new HttpErrorResponse({
        status: 0,
        statusText: 'Unknown Error'
      });
    });

    spyOn(component, 'getMoods').and.callFake(() => {
      component.moodsErr = new HttpErrorResponse({
        status: 0,
        statusText: 'Unknown Error'
      });
    });

    // get moods and activities
    component.getMoods();
    component.getActivities();
    fixture.detectChanges();
    const activityErrMsg = <HTMLElement>nativeEl.querySelector('#activityErr');
    const moodErrMsg = <HTMLElement>nativeEl.querySelector('#moodErr');
    expect(activityErrMsg.textContent).toContain('Couldn\'t reach the database.');
    expect(moodErrMsg.textContent).toContain('Couldn\'t reach the database.');
  });

  it('should show a list of moods when the moods panel is expanded', () => {
    fixture.detectChanges();
    const moods = nativeEl.querySelectorAll('.mood');
    expect(moods[0].textContent).toEqual('Happy');
    expect(moods[1].textContent).toEqual('Melancholy');
    expect(moods[2].textContent).toEqual('Downbeat');
    expect(moods[3].textContent).toEqual('Cheerful');
  });

  it('should show a list of activities when the activities panel is expanded', () => {
    fixture.detectChanges();
    const activities = nativeEl.querySelectorAll('.activity');
    expect(activities[0].textContent).toEqual('Dancing');
    expect(activities[1].textContent).toEqual('Kayaking');
    expect(activities[2].textContent).toEqual('Cycling');
    expect(activities[3].textContent).toEqual('Reading');
  });

  it('should add a new activity to the list of activities when the save button is clicked', () => {
    const addActivitySpy = spyOn(component, 'addActivity').and.callThrough();
    const activityInput = <HTMLInputElement>nativeEl.querySelector('#activityInput');

    activityInput.value = 'Strength Training';
    activityInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    const saveBtn = debugEl.query(By.css('#saveActivity'));
    expect(component.activities.length).toEqual(4, '4 activities');
    click(saveBtn);
    fixture.detectChanges();
    expect(component.activities.length).toEqual(5, '5 activities');
    const activityItems = nativeEl.querySelectorAll('.activity');
    expect(activityItems[4].textContent).toEqual('Strength Training');
    expect(addActivitySpy).toHaveBeenCalledTimes(1);
    expect(addActivitySpy).toHaveBeenCalledWith('Strength Training');
  });

  it('should add a new mood to the list of moods when the save button is clicked', () => {
    const addMoodSpy = spyOn(component, 'addMood').and.callThrough();
    const moodInput = <HTMLInputElement>nativeEl.querySelector('#moodInput');

    moodInput.value = 'Tired';
    moodInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    const saveBtn = debugEl.query(By.css('#saveMood'));
    expect(component.moods.length).toEqual(4, '4 moods');
    click(saveBtn);
    fixture.detectChanges();
    expect(component.moods.length).toEqual(5, '5 moods');
    const moodItems = nativeEl.querySelectorAll('.mood');
    expect(moodItems[4].textContent).toEqual('Tired');
    expect(addMoodSpy).toHaveBeenCalledTimes(1);
    expect(addMoodSpy).toHaveBeenCalledWith('Tired');
  });
});

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
