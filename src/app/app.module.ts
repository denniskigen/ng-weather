import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather.service';
import { RoundTemperaturePipe } from './round-temperature.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    RoundTemperaturePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ WeatherService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
