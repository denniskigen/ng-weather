import { Component, OnInit, OnDestroy } from '@angular/core';

import { Weather } from '../weather';
import {  WeatherService } from '../weather.service';
import * as weatherIcons from '../icons.json';
import * as recommendations from '../recommendations.json';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  error: any;
  city = 'Eldoret';
  icon: string;
  forecasts = [];
  forecastIcon: string;
  imageUrl: `http://openweathermap.org/img/w/`;
  // weather data for five days in three hour intervals
  searchTerm = '';
  prefix = 'wi wi-owm-';
  recommendation: string;
  weather: Weather;
  icons = weatherIcons.default;


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather(this.city);
    this.getForecast(this.city);
  }

  getWeather(city: string) {
    this.weatherService.getCurrentWeather(city).subscribe(
      (data) => {
        this.weather = data;
        this.icon = weatherIcons.default[data.icon_id].icon;
        if (!(data.icon_id > 699 && data.icon_id < 800) && !(data.icon_id > 899 && data.icon_id < 1000)) {
          this.icon = 'day-' + data.icon_id;
        }
        this.icon = this.prefix + this.icon;
        this.recommendation = recommendations.default[data.icon_id].recommendation;
      }
    );
  }

  getForecast(city: string): void {
    this.weatherService.getFiveDayForecast(city).subscribe((data: any) => {
      for (let i = 0; i < data.list.length; i += 8) {
        this.forecasts.push(data.list[i]);
      }
    });
  }

  findForecast(searchTerm) {
    this.getWeather(this.searchTerm);
    this.forecasts = [];
    this.getForecast(this.searchTerm);
  }
}

  // ngOnDestroy(); {
  // //   this.weatherSub.unsubscribe();
  // }
