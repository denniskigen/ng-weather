export interface Weather {
  city: string;
  condition: number;
  country: string;
  date: number;
  description: string;
  humidity: number;
  icon_id: number;
  image: string;
  temperature: number;
  wind_speed: number;
  [key: string]: string | number;
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

export interface ForecastData {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: ForecastListItem[];
  message: number;
}

export interface ForecastListItem {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  visibility: number;
  weather: WeatherData[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Forecast {
  date: number;
  description: string;
  dt_txt: string;
  humidity: number;
  icon: string;
  icon_id: number;
  image: string;
  max: number;
  min: number;
  temperature: number;
  wind_speed: number;
  [key: string]: string | number;
}
export interface WeatherIconData {
  label: string;
  icon: string;
}

export interface RecommendationData {
  recommendation: string;
}
