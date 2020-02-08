import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { WeatherService } from '../weather.service';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city = 'Eldoret';
  error: any;
  forecast: any[] = [];
  forecastIcons = [];
  icon = '';
  icons = weatherIcons['default'];
  validSearch: Boolean = false;
  prefix = 'wi wi-';
  recommendation = '';
  search = new FormControl();
  weather: any;

  constructor(
    private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather(this.city);
    this.getForecast(this.city);
    this.searchWeather();
    this.resetError();
  }

  getWeather(city: string): void {
    this.weatherService.getCurrentWeather(city).subscribe(
      data => {
        this.weather = data;
        this.recommendation = recommendations['default'][data.icon_id].recommendation;
        this.icon = this.prefix + weatherIcons['default'][data.icon_id].icon;
      },
      error => {
        this.validSearch = true;
        this.error = error.error ? error.error : error;
      }
    );
  }

  getForecast(city: string): void {
    this.weatherService.getFiveDayForecast(city).subscribe(
      data => {
        this.forecast = data;
      },
      error => {
        this.error = error.error ? error.error : error;
      }
    );
  }

  searchWeather(): void {
    this.search
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(
        (searchValue: string) => {
          if (searchValue) {
            searchValue = searchValue.trim();
            this.resetError();
            this.getWeather(searchValue);
            this.getForecast(searchValue);
          }
        },
        err => {
          console.error('Search Error: ', err);
        }
      );
  }

  private resetError() {
    this.error = '';
  }
}
