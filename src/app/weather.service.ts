import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ENV } from './env.config';
import { CurrentWeatherData, Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  forecast: any[] = [];

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<Weather> {
    return this.http
      .get<CurrentWeatherData>(
        `${ENV.API_URL}weather/?q=${city}&units=metric&APPID=${ENV.API_KEY}`)
      .pipe(
        map(data => this.mapToWeather(data)),
        catchError(this.handleError)
      );
  }

  getFiveDayForecast(city: string): Observable<Weather[]> {
    return this.http
      .get<CurrentWeatherData[]>(
        `${ENV.API_URL}forecast/?q=${city}&units=metric&APPID=${ENV.API_KEY}`)
      .pipe(
        map((data: any) => {
          this.forecast = [];
          for (let i = 0; i < data.list.length; i += 8) {
            this.forecast.push(this.mapToWeather(data.list[i + 4]));
          }
          return this.forecast;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      if (!navigator.onLine) {
        // Check your internet connection
        return throwError('It seems like you\'re not connected to the internet');
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

  private mapToWeather(data: CurrentWeatherData): Weather {
    const mapped: any = {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      humidity: data.main.humidity,
      icon_id: data.weather[0].id,
      image: `${ENV.iconUrl}${data.weather[0].icon}.png`,
      temperature: data.main.temp,
      description: data.weather[0].description,
      wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
      condition: data.cod
    };
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }

    if (data.weather[0].icon) {
      mapped.icon = data.weather[0].icon;
    }

    if (data.main.temp_min && data.main.temp_max) {
      mapped.max = data.main.temp_max;
      mapped.min = data.main.temp_min;
    }

    // remove undefined fields
    Object.keys(mapped).forEach(key => mapped[key] === undefined && delete mapped[key]);

    return mapped;
  }
}
