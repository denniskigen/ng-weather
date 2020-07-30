import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';

import { CapitalizePipe } from './capitalize.pipe';
import { RoundTemperaturePipe } from './round-temperature.pipe';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        AppComponent,
        WeatherComponent,
        CapitalizePipe,
        RoundTemperaturePipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = debugEl.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display `ngWeather` as the app banner title', () => {
    const appTitle = <HTMLElement>nativeEl.querySelector('mat-toolbar');
    expect(appTitle.innerHTML).toContain('ngWeather');
  });
});
