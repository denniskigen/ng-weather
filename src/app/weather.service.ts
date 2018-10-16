import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ENV } from './env.config';
import { Weather } from './weather';

export interface CurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
      id: number;
    }
  ];
  wind: {
    speed: number;
  };
  main: {
    temp: number;
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
  constructor(private http: HttpClient) {}

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

  getFiveDayForecast(city: string) {
    return this.http
      .get<any[]>(
        `${ENV.API_URL}forecast/?q=${city}&units=metric&APPID=${
          ENV.API_KEY
        }`
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Server returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(`Something bad happened; please try again later.`);
  }

  private mapToWeather(data: CurrentWeatherData): Weather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      humidity: data.main.humidity,
      icon_id: data.weather[0].id,
      image: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp,
      description: data.weather[0].description,
      wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
      condition: data.cod
    };
  }
}
