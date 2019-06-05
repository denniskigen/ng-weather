import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Weather } from '../weather';
import { ApiService } from '../api.service';
import { WeatherService } from '../weather.service';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  activities: any;
  city = 'Eldoret';
  error: any;
  forecast: any[] = [];
  forecastIcons = [];
  icon = '';
  icons = weatherIcons.default;
  moods: any;
  validSearch: Boolean = false;
  prefix = 'wi wi-';
  recommendation = '';
  search = new FormControl();
  serverErr: any;
  weather!: Weather;

  constructor(
    private apiService: ApiService,
    private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.city);
    this.getForecast(this.city);
    this.searchWeather();
    this.getActivities();
    this.getMoods();
  }

  getWeather(city: string) {
    this.weatherService.getCurrentWeather(city).subscribe(
      data => {
        this.weather = data;
        this.recommendation =
          recommendations.default[data.icon_id].recommendation;
        this.icon = this.prefix + weatherIcons.default[data.icon_id].icon;
      },
      error => {
        this.validSearch = true;
        console.error('error: ', error);
        this.error = error.error;
      }
    );
  }

  getForecast(city: string): void {
    this.weatherService.getFiveDayForecast(city).subscribe(data => this.forecast = data);
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
            console.log('Search Error', err);
          }
        );
  }

  addActivity(name: string): void {
    if (!name) { return; }
    console.log(name);
    this.apiService.createActivity({ name: name })
      .subscribe(activity => {
        this.activities.push(activity);
        this.getActivities();
      });
  }

  addMood(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.log(name);
    this.apiService.createMood({ name: name })
      .subscribe(mood => {
        this.moods.push(mood);
        this.getMoods();
      });
  }

  deleteActivity(id: number): void {
    this.apiService.deleteActivity(id).subscribe();
  }

  deleteMood(id: number): void {
    this.apiService.deleteMood(id).subscribe();
  }

  getActivities(): void {
    this.apiService.getActivities().subscribe(activities => {
      this.activities = activities.activities;
    });
  }

  getMoods(): void {
    this.apiService.getMoods().subscribe(moods => {
      this.moods = moods.moods;
    });
  }

  private resetError() {
    this.error = '';
  }
}
