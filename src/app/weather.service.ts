import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ENV } from './env.config';
import {
  CurrentWeatherData,
  Forecast,
  ForecastData,
  ForecastListItem,
  Weather,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  forecast: Forecast[] = [];

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<Weather> {
    return this.http
      .get<CurrentWeatherData>(
        `${ENV.API_URL}weather/?q=${city}&units=metric&APPID=${ENV.API_KEY}`
      )
      .pipe(
        map((data) => this.mapToWeather(data)),
        catchError(this.handleError)
      );
  }

  getFiveDayForecast(city: string): Observable<Forecast[]> {
    return this.http
      .get<ForecastData>(
        `${ENV.API_URL}forecast/?q=${city}&units=metric&APPID=${ENV.API_KEY}`
      )
      .pipe(
        map((data: ForecastData) => {
          this.forecast = [];
          for (let i = 0; i < data.list.length; i += 8) {
            this.forecast.push(
              this.mapToForecast(<ForecastListItem>data.list[i + 4])
            );
          }
          return this.forecast;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: Error | HttpErrorResponse): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      if (!navigator.onLine) {
        // Check your internet connection
        return throwError("It seems like you're not connected to the internet");
      } else {
        // Handle HTTP error (error.status === 403, 404, 500...)
        return throwError(error);
      }
    } else {
      // It's likely something wrong on the client-side
      console.error('Oops:', error);
    }
    return throwError('An error occurred. Please try again.');
  }

  private mapToForecast(data: ForecastListItem): Forecast {
    const mappedForecast: Forecast = {
      date: data.dt * 1000,
      description: data.weather[0].description,
      dt_txt: data.dt_txt ? data.dt_txt : '',
      humidity: data.main.humidity,
      icon: data.weather[0].icon ? data.weather[0].icon : '',
      icon_id: data.weather[0].id,
      image: `${ENV.iconUrl}${data.weather[0].icon}.png`,
      max: data.main.temp_max,
      min: data.main.temp_min,
      temperature: data.main.temp,
      wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
    };

    return mappedForecast;
  }

  private mapToWeather(data: CurrentWeatherData): Weather {
    const mappedWeather: Weather = {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      humidity: data.main.humidity,
      icon_id: data.weather[0].id,
      image: `${ENV.iconUrl}${data.weather[0].icon}.png`,
      temperature: data.main.temp,
      description: data.weather[0].description,
      wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
      condition: data.cod,
    };

    return mappedWeather;
  }
}
