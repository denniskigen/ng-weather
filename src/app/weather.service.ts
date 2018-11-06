import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ENV } from './env.config';
import { Weather } from './weather';

interface CurrentWeatherData {
  weather: [
    {
      description: string;
      id: number;
      icon: string;
      main: string;
    }
  ];
  wind: {
    speed: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
  cod: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  forecast: any[] = [];
  constructor(
    private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<Weather> {
    return this.http
      .get<CurrentWeatherData>(
        `${ENV.API_URL}weather/?q=${city}&units=metric&APPID=${ENV.API_KEY}`
      )
      .pipe(
        map(data => this.mapToWeather(data)),
        catchError(this.handleError)
      );
  }

  getFiveDayForecast(city: string): Observable<Weather[]> {
    return this.http
      .get<CurrentWeatherData[]>(
        `${ENV.API_URL}forecast/?q=${city}&units=metric&APPID=${
          ENV.API_KEY
        }`
      )
      .pipe(
        map((data: any) => {
          this.forecast = [];
          for (let i = 0; i < data.list.length; i += 8) {
            this.forecast.push(data.list[i + 4]);
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
        console.error('It seems like you\'re not connected to the internet');
      } else {
        // Handle HTTP error (error.status === 403, 404, 500...)
        console.error(`${error.status} - ${error.message}`);
      }
    } else {
      // It's likely something wrong on the client-side
      console.error('Oops', error);
    }
    return throwError('An error occurred. Please try again.');
  }

  private mapToWeather(data: CurrentWeatherData): Weather {
    return {
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
  }
}
