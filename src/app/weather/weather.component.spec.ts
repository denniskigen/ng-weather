import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import '@testing-library/jest-dom';

import { MaterialModule } from '../material.module';
import { RoundTemperaturePipe } from '../round-temperature.pipe';
import { WeatherService } from '../weather.service';
import { WeatherComponent } from './weather.component';
import {
  searchWeatherResult,
  testCurrentWeather,
  testFiveDayForecast,
} from '../weather.mock';

const moduleImports = [FormsModule, ReactiveFormsModule, MaterialModule];
const componentDeclarations = [WeatherComponent, RoundTemperaturePipe];

const serverError = new HttpErrorResponse({
  error: { cod: 500, message: 'Internal Server Error' },
  status: 500,
  statusText: 'An internal server error occurred',
  url: '',
});

const notFoundError = new HttpErrorResponse({
  error: { cod: '404', message: 'city not found' },
  status: 404,
  statusText: 'Not Found',
  url:
    'https://api.openweathermap.org/data/2.5/forecast/?q=ryo%20de%20janeiro&units=metric&APPID=baedc2f2f31b7b3303e5d42d88d283c3',
});

describe('WeatherComponent', () => {
  test('renders the current weather and five day forecast for the default city', async () => {
    await render(WeatherComponent, {
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
      declarations: [WeatherComponent, RoundTemperaturePipe],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather() {
              return of(testCurrentWeather);
            },
            getFiveDayForecast() {
              return of(testFiveDayForecast);
            },
          },
        },
      ],
    });

    expect(
      screen.getByRole('textbox', { name: /Enter city name/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Eldoret, KE/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday, 7:13 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Broken Clouds/i)).toBeInTheDocument();
    expect(screen.getByText(/17°C/i)).toBeInTheDocument();
    expect(screen.getByText(/4 km\/h Winds/i)).toBeInTheDocument();
    expect(screen.getByText(/88% Humidity/i)).toBeInTheDocument();
    expect(
      screen.getByText(/'Netflix and chill' weather. It's pleasant outside/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('separator', { name: '' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(5);
  });

  test('shows the weather and forecast for a valid city typed into the search box', async () => {
    const searchWeatherFn = jest.fn();

    await render(WeatherComponent, {
      componentProperties: {
        searchWeather: searchWeatherFn,
      },
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
      declarations: [WeatherComponent, RoundTemperaturePipe],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather() {
              return of(searchWeatherResult.weather);
            },
            getFiveDayForecast() {
              return of(searchWeatherResult.forecast);
            },
          },
        },
      ],
    });

    const searchInput = screen.getByRole('textbox', {
      name: /Enter city name/i,
    });

    userEvent.type(searchInput, 'Rio De Janeiro');

    await screen.findByText(/Rio De Janeiro, BR/i);
    expect(searchWeatherFn).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Saturday, 9:09 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/Few Clouds/i)).toBeInTheDocument();
    expect(screen.getByText(/18°C/i)).toBeInTheDocument();
    expect(screen.getByText(/13 km\/h Winds/i)).toBeInTheDocument();
    expect(screen.getByText(/94% Humidity/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Great day for a bit of laundry and maybe a nice picnic date later :\)/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('separator', { name: '' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toEqual(5);
  });

  test('throws an error when the city typed into the search box is not valid', async () => {
    await render(WeatherComponent, {
      imports: [...moduleImports],
      declarations: [...componentDeclarations],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather() {
              return throwError(notFoundError);
            },
            getFiveDayForecast() {
              return throwError(notFoundError);
            },
          },
        },
      ],
    });

    const errorElement = screen.getByRole('alert');
    expect(errorElement.textContent).toMatch(/404: city not found/i);
  });

  test('throws an error when weather and forecast data cannot be retrieved', async () => {
    await render(WeatherComponent, {
      imports: [...moduleImports],
      declarations: [...componentDeclarations],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getCurrentWeather() {
              return throwError(serverError);
            },
            getFiveDayForecast() {
              return throwError(serverError);
            },
          },
        },
      ],
    });

    const errorElement = screen.getByRole('alert');
    expect(errorElement.textContent).toMatch(/500: internal server error/i);
  });
});
