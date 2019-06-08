import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { searchWeatherResult } from '../weather.mock';
import { WeatherComponent } from './weather.component';
import { ApiService } from '../api.service';
import { TestApiService } from '../test-api.service';
import { TestWeatherService } from './test-weather.service';
import { WeatherService } from '../weather.service';

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

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let service: WeatherService;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

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
          useClass: TestApiService
        },
        {
          provide: WeatherService,
          useClass: TestWeatherService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(WeatherService);
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current weather, five day forecast, activities and moods after ngOnInit', () =>  {
    expect(component.city).toEqual('Eldoret', 'default city');
    component.ngOnInit();
    const cardTitle = nativeEl.querySelector('mat-card-title');
    const cardSubtitles = nativeEl.querySelectorAll('mat-card-subtitle');
    const temp = nativeEl.querySelector('.large.temp');
    const recommendation = nativeEl.querySelector('.recommendation');
    const forecastItems = nativeEl.querySelectorAll('mat-list-item.forecast');
    const activityItems = nativeEl.querySelectorAll('mat-list-item.activity');
    const moodItems = nativeEl.querySelectorAll('mat-list-item.mood');

    // tslint:disable-next-line: no-non-null-assertion
    expect(cardTitle!.innerHTML).toMatch(/Eldoret, KE/);
    expect(cardSubtitles[0].innerHTML).toContain('Tuesday, 10:13 PM');
    expect(cardSubtitles[0].innerHTML).toContain('Broken Clouds');
    expect(cardSubtitles[1].innerHTML).toContain('4 km/h Winds');
    expect(cardSubtitles[1].innerHTML).toContain('88% Humidity');
    // tslint:disable-next-line: no-non-null-assertion
    expect(temp!.innerHTML).toMatch(/17°C/);
    // tslint:disable-next-line: no-non-null-assertion
    expect(recommendation!.innerHTML).toMatch(/'Netflix and chill' weather. It's pleasant outside/);
    expect(forecastItems.length).toEqual(5, 'Five day forecast');
    expect(moodItems.length).toEqual(4, 'Four mood items');
    expect(activityItems.length).toEqual(4, 'Four activity items');
  });

  it('should show the current weather for the default city as well as a recommendation based on the weather', () => {
    expect(component.city).toEqual('Eldoret', 'default city');
    component.getWeather(component.city);
    expect(component.weather).toBeDefined();
    expect(component.weather.city).toEqual('Eldoret');
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
    expect(component.city).toEqual('Eldoret', 'default city');
    component.getForecast(component.city);
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
    expect(component.city).toEqual('Eldoret');
    const searchInput = nativeEl.querySelector<HTMLInputElement>('input.search');
    const cardTitle = nativeEl.querySelector('mat-card-title');
    const cardSubtitles = nativeEl.querySelectorAll('mat-card-subtitle');
    const temp = nativeEl.querySelector('.large.temp');
    const recommendation = nativeEl.querySelector('.recommendation');
    const forecastItems = nativeEl.querySelectorAll('mat-list-item.forecast');

    // tslint:disable-next-line: no-non-null-assertion
    searchInput!.value = 'Rio De Janeiro';
    // tslint:disable-next-line: no-non-null-assertion
    searchInput!.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    // tslint:disable-next-line: no-non-null-assertion
    expect(searchInput!.value).toEqual('Rio De Janeiro');
    spyOn(component, 'searchWeather').and.callFake(() => {
      component.weather = searchWeatherResult.weather;
      component.forecast = searchWeatherResult.forecast;
    });
    // search weather
    component.searchWeather();
    fixture.detectChanges();
    // tslint:disable-next-line: no-non-null-assertion
    expect(cardTitle!.innerHTML).toMatch(/Rio de Janeiro, BR/);
    expect(cardSubtitles[0].innerHTML).toContain('Saturday, 12:09 PM');
    expect(cardSubtitles[0].innerHTML).toContain('Few Clouds');
    expect(cardSubtitles[1].innerHTML).toContain('13 km/h Winds');
    expect(cardSubtitles[1].innerHTML).toContain('94% Humidity');
    // tslint:disable-next-line: no-non-null-assertion
    expect(temp!.innerHTML).toMatch(/18°C/);
    // tslint:disable-next-line: no-non-null-assertion
    expect(recommendation!.innerHTML).toMatch(/'Netflix and chill' weather. It's pleasant outside/);
    expect(forecastItems.length).toEqual(5, 'Five day forecast');
  });

  it('should throw an error when the city being searched for is invalid', () => {
    const searchInput = nativeEl.querySelector<HTMLInputElement>('input.search');

    // tslint:disable-next-line: no-non-null-assertion
    searchInput!.value = 'Ryo De Janero';
    // tslint:disable-next-line: no-non-null-assertion
    searchInput!.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    // tslint:disable-next-line: no-non-null-assertion
    expect(searchInput!.value).toEqual('Ryo De Janero');
    spyOn(component, 'searchWeather').and.callFake(() => {
      component.error = mock404ErrorResponse.error;
    });
    // search weather
    component.searchWeather();
    fixture.detectChanges();
    // tslint:disable-next-line: no-non-null-assertion
    const err = nativeEl.querySelector<HTMLElement>('.err');
    expect(err!.textContent).toContain('City not found. Please enter a different location');
  });

  it('should throw an error when moods or activities cannot be retrieved from the database', () => {
    const moodErr = nativeEl.querySelector<HTMLElement>('#moodErr');
    const activityErr = nativeEl.querySelector<HTMLElement>('#activityErr');

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

    // get moods
    component.getMoods();
    component.getActivities();
    fixture.detectChanges();
    const activityErrMsg = nativeEl.querySelector<HTMLElement>('#activityErr');
    const moodErrMsg = nativeEl.querySelector<HTMLElement>('#moodErr');
    expect(activityErrMsg!.textContent).toContain('Couldn\'t reach the database.');
    expect(moodErrMsg!.textContent).toContain('Couldn\'t reach the database.');
  });

  it('should show a list of moods when the moods panel is expanded', () => {
    const moodItems = nativeEl.querySelectorAll('.mood');
    expect(moodItems[0].textContent).toEqual('Happy');
    expect(moodItems[1].textContent).toEqual('Melancholy');
    expect(moodItems[2].textContent).toEqual('Downbeat');
    expect(moodItems[3].textContent).toEqual('Cheerful');
  });

  it('should show a list of activities when the activities panel is expanded', () => {
    const activityItems = nativeEl.querySelectorAll('.activity');
    expect(activityItems[0].textContent).toEqual('Dancing');
    expect(activityItems[1].textContent).toEqual('Kayaking');
    expect(activityItems[2].textContent).toEqual('Cycling');
    expect(activityItems[3].textContent).toEqual('Reading');
  });

  it('should add a new activity to the list of activities when the save button is clicked', () => {
    const activityInput = nativeEl.querySelector<HTMLInputElement>('#activityInput');

    // tslint:disable-next-line: no-non-null-assertion
    activityInput!.value = 'Strength Training';
    // tslint:disable-next-line: no-non-null-assertion
    activityInput!.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    // tslint:disable-next-line: no-non-null-assertion
    const saveBtn = debugEl.query(By.css('#saveActivity'));
    expect(component.activities.length).toEqual(4, '4 activities');
    click(saveBtn);
    fixture.detectChanges();
    expect(component.activities.length).toEqual(5, '5 activities');
    const activityItems = nativeEl.querySelectorAll<HTMLElement>('mat-list-item.activity');
    expect(activityItems[4].textContent).toEqual('Strength Training');
  });

  it('should add a new mood to the list of moods when the save button is clicked', () => {
    const moodInput = nativeEl.querySelector<HTMLInputElement>('#moodInput');

    // tslint:disable-next-line: no-non-null-assertion
    moodInput!.value = 'Tired';
    // tslint:disable-next-line: no-non-null-assertion
    moodInput!.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    // tslint:disable-next-line: no-non-null-assertion
    const saveBtn = debugEl.query(By.css('#saveMood'));
    expect(component.moods.length).toEqual(4, '4 moods');
    click(saveBtn);
    fixture.detectChanges();
    expect(component.moods.length).toEqual(5, '5 moods');
    const moodItems = nativeEl.querySelectorAll<HTMLElement>('mat-list-item.mood');
    expect(moodItems[4].textContent).toEqual('Tired');
  });
});

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
const ButtonClickEvents = {
  left:  { button: 0 },
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
