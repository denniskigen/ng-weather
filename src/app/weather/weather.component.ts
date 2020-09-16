import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { WeatherService } from '../weather.service';
import { Forecast, Weather, WeatherIconData, WeatherIconId } from '../types';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  city = 'Eldoret';
  error: HttpErrorResponse | undefined;
  forecast: Forecast[] = [];
  icon = '';
  icons: Record<WeatherIconId, WeatherIconData> = weatherIcons['default'];
  validSearch = false;
  prefix = 'wi wi-';
  recommendation = '';
  search = new FormControl();
  weather: Weather | undefined;
  subs: Subscription[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.city);
    this.getForecast(this.city);
    this.searchWeather();
    this.resetError();
  }

  ngOnDestroy(): void {
    if (this.subs.length) {
      this.subs.map((sub) => sub.unsubscribe());
    }
  }

  getWeather(city: string): void {
    const getCurrentWeatherSub$ = this.weatherService
      .getCurrentWeather(city)
      .subscribe(
        (currentWeather) => {
          this.weather = currentWeather;
          this.recommendation =
            recommendations['default'][currentWeather.icon_id].recommendation;
          this.icon =
            this.prefix + weatherIcons['default'][currentWeather.icon_id].icon;
        },
        (error) => {
          this.validSearch = true;
          this.error =
            error instanceof HttpErrorResponse
              ? `${error.error.cod}: ${error.error.message}`
              : error;
        }
      );

    this.subs.push(getCurrentWeatherSub$);
  }

  getForecast(city: string): void {
    const getForecastSub$ = this.weatherService
      .getFiveDayForecast(city)
      .subscribe(
        (fiveDayForecast) => {
          this.forecast = fiveDayForecast;
        },
        (error) => {
          this.error =
            error instanceof HttpErrorResponse
              ? `${error.error.cod}: ${error.error.message}`
              : error;
        }
      );

    this.subs.push(getForecastSub$);
  }

  searchWeather(): void {
    const searchWeatherSub$ = this.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(
        (searchValue: string) => {
          if (searchValue) {
            searchValue = searchValue.trim();
            this.resetError();
            this.getWeather(searchValue);
            this.getForecast(searchValue);
          }
        },
        (err) => {
          console.error('Search Error: ', err);
        }
      );

    this.subs.push(searchWeatherSub$);
  }

  private resetError(): void {
    this.error = undefined;
  }
}
