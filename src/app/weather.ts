export interface Weather {
  city?: string;
  country?: string;
  date: number;
  humidity: number;
  icon_id: number;
  image: string;
  temperature: number;
  description: string;
  wind_speed: number;
  condition?: number;
  dt_txt?: string;
  icon?: string;
  min?: number;
  max?: number;
}

export interface CurrentWeatherData {
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
  dt_txt?: string;
}
