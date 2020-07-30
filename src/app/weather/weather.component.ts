import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { WeatherService } from '../weather.service';
import { Forecast, Weather } from '../types';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  city = 'Eldoret';
  error: HttpErrorResponse | undefined = undefined;
  forecast: Forecast[] = [];
  forecastIcons = [];
  icon = '';
  icons = weatherIcons['default'];
  validSearch = false;
  prefix = 'wi wi-';
  recommendation = '';
  search = new FormControl();
  weather: Weather | undefined = undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.city);
    this.getForecast(this.city);
    this.searchWeather();
    this.resetError();
  }

  getWeather(city: string): void {
    this.weatherService.getCurrentWeather(city).subscribe(
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
  }

  getForecast(city: string): void {
    this.weatherService.getFiveDayForecast(city).subscribe(
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
  }

  searchWeather(): void {
    this.search.valueChanges
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
  }

  private resetError() {
    this.error = undefined;
  }
}
