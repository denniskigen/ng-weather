import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';

import { Weather } from '../weather';
import { WeatherService } from '../weather.service';

@Injectable()
/**
 * FakeWeatherService pretends to make real http requests.
 * implements only as much of WeatherService as is actually consumed by the app
*/
export class TestWeatherService extends WeatherService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  lastResult!: Observable<any>;
  currentWeather: Weather = {
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
    min: 13
  };

  fiveDayForecast: Weather[] = [
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
      wind_speed: 10
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
      wind_speed: 8
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
      wind_speed: 7
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
      wind_speed: 7
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
      wind_speed: 6
    },
  ];

  getCurrentWeather(city: string): Observable<Weather> {
    return this.lastResult = of(this.currentWeather);
  }

  getFiveDayForecast(city: string): Observable<Weather[]> {
    return this.lastResult = of(this.fiveDayForecast);
  }
}
