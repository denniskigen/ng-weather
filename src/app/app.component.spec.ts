import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RoundTemperaturePipe } from './round-temperature.pipe';
import { WeatherComponent } from './weather/weather.component';
import '@testing-library/jest-dom';

describe('AppComponent', () => {
  it('renders the app', async () => {
    const component = await render(AppComponent, {
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [AppComponent, WeatherComponent, RoundTemperaturePipe],
    });
    expect(component).toBeTruthy();
    expect(component.getByText(/ngWeather/)).toBeInTheDocument();
    expect(component.getByText(/Enter city name/)).toBeInTheDocument();
  });
});
