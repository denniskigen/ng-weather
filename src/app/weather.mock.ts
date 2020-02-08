import { CurrentWeatherData, Weather } from './weather';

export const testCurrentWeather: Weather = {
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

export const testFiveDayForecast: Weather[] = [
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

export const mockCurrentWeather: CurrentWeatherData = {
  'weather': [
    {
      'id': 803,
      'main': 'Clouds',
      'description': 'broken clouds',
      'icon': '04n'
    }
  ],
  'main': {
    'temp': 17,
    'humidity': 88,
    'temp_min': 13,
    'temp_max': 22
  },
  'wind': {
    'speed': 1
  },
  'dt': 1559675580,
  'sys': {
    'country': 'KE'
  },
  'name': 'Eldoret',
  'cod': 200,
  'dt_txt': ''
};

export const mockFiveDayForecast = {
  'cod': '200',
  'message': 0.0064,
  'cnt': 40,
  'list': [
    {
      'dt': 1559682000,
      'main': {
        'temp': 15.95,
        'temp_min': 15.1,
        'temp_max': 15.95,
        'pressure': 1016.42,
        'sea_level': 1016.42,
        'grnd_level': 817.73,
        'humidity': 96,
        'temp_kf': 0.86
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 1.29,
        'deg': 45.849
      },
      'rain': {
        '3h': 3.25
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-04 21:00:00'
    },
    {
      'dt': 1559692800,
      'main': {
        'temp': 14.99,
        'temp_min': 14.35,
        'temp_max': 14.99,
        'pressure': 1015.22,
        'sea_level': 1015.22,
        'grnd_level': 816.52,
        'humidity': 96,
        'temp_kf': 0.64
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 1.9,
        'deg': 62.612
      },
      'rain': {
        '3h': 0.562
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-05 00:00:00'
    },
    {
      'dt': 1559703600,
      'main': {
        'temp': 14.38,
        'temp_min': 13.95,
        'temp_max': 14.38,
        'pressure': 1015.5,
        'sea_level': 1015.5,
        'grnd_level': 816.72,
        'humidity': 95,
        'temp_kf': 0.43
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 2.09,
        'deg': 70.151
      },
      'rain': {
        '3h': 0.375
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-05 03:00:00'
    },
    {
      'dt': 1559714400,
      'main': {
        'temp': 16.96,
        'temp_min': 16.75,
        'temp_max': 16.96,
        'pressure': 1015.96,
        'sea_level': 1015.96,
        'grnd_level': 817.39,
        'humidity': 86,
        'temp_kf': 0.21
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 1.63,
        'deg': 57.341
      },
      'rain': {
        '3h': 0.125
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-05 06:00:00'
    },
    {
      'dt': 1559725200,
      'main': {
        'temp': 21.53,
        'temp_min': 12.98,
        'temp_max': 21.53,
        'pressure': 1014.55,
        'sea_level': 1014.55,
        'grnd_level': 817.05,
        'humidity': 67,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 801,
          'main': 'Clouds',
          'description': 'few clouds',
          'icon': '02d'
        }
      ],
      'clouds': {
        'all': 21
      },
      'wind': {
        'speed': 2.9,
        'deg': 286.546
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-05 09:00:00'
    },
    {
      'dt': 1559736000,
      'main': {
        'temp': 21.02,
        'temp_min': 21.02,
        'temp_max': 21.02,
        'pressure': 1011.63,
        'sea_level': 1011.63,
        'grnd_level': 814.84,
        'humidity': 79,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 19
      },
      'wind': {
        'speed': 3.61,
        'deg': 250.132
      },
      'rain': {
        '3h': 2.937
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-05 12:00:00'
    },
    {
      'dt': 1559746800,
      'main': {
        'temp': 17.94,
        'temp_min': 17.94,
        'temp_max': 17.94,
        'pressure': 1011.61,
        'sea_level': 1011.61,
        'grnd_level': 814.57,
        'humidity': 93,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 27
      },
      'wind': {
        'speed': 2.67,
        'deg': 243.915
      },
      'rain': {
        '3h': 3.25
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-05 15:00:00'
    },
    {
      'dt': 1559757600,
      'main': {
        'temp': 14.25,
        'temp_min': 14.25,
        'temp_max': 14.25,
        'pressure': 1014.88,
        'sea_level': 1014.88,
        'grnd_level': 816.72,
        'humidity': 98,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 24
      },
      'wind': {
        'speed': 0.67,
        'deg': 232.306
      },
      'rain': {
        '3h': 1.688
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-05 18:00:00'
    },
    {
      'dt': 1559768400,
      'main': {
        'temp': 13.38,
        'temp_min': 13.38,
        'temp_max': 13.38,
        'pressure': 1016.03,
        'sea_level': 1016.03,
        'grnd_level': 817.41,
        'humidity': 98,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 801,
          'main': 'Clouds',
          'description': 'few clouds',
          'icon': '02n'
        }
      ],
      'clouds': {
        'all': 19
      },
      'wind': {
        'speed': 0.89,
        'deg': 102.536
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-05 21:00:00'
    },
    {
      'dt': 1559779200,
      'main': {
        'temp': 12.95,
        'temp_min': 12.95,
        'temp_max': 12.95,
        'pressure': 1014.67,
        'sea_level': 1014.67,
        'grnd_level': 816.15,
        'humidity': 97,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 802,
          'main': 'Clouds',
          'description': 'scattered clouds',
          'icon': '03n'
        }
      ],
      'clouds': {
        'all': 35
      },
      'wind': {
        'speed': 1.47,
        'deg': 101.111
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-06 00:00:00'
    },
    {
      'dt': 1559790000,
      'main': {
        'temp': 12.45,
        'temp_min': 12.45,
        'temp_max': 12.45,
        'pressure': 1014.91,
        'sea_level': 1014.91,
        'grnd_level': 816.19,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 802,
          'main': 'Clouds',
          'description': 'scattered clouds',
          'icon': '03n'
        }
      ],
      'clouds': {
        'all': 35
      },
      'wind': {
        'speed': 1.73,
        'deg': 91.554
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-06 03:00:00'
    },
    {
      'dt': 1559800800,
      'main': {
        'temp': 17.85,
        'temp_min': 17.85,
        'temp_max': 17.85,
        'pressure': 1016.12,
        'sea_level': 1016.12,
        'grnd_level': 817.84,
        'humidity': 82,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 801,
          'main': 'Clouds',
          'description': 'few clouds',
          'icon': '02d'
        }
      ],
      'clouds': {
        'all': 23
      },
      'wind': {
        'speed': 0.69,
        'deg': 14.036
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-06 06:00:00'
    },
    {
      'dt': 1559811600,
      'main': {
        'temp': 22.28,
        'temp_min': 13.44,
        'temp_max': 22.28,
        'pressure': 1014.55,
        'sea_level': 1014.55,
        'grnd_level': 817.28,
        'humidity': 60,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 801,
          'main': 'Clouds',
          'description': 'few clouds',
          'icon': '02d'
        }
      ],
      'clouds': {
        'all': 17
      },
      'wind': {
        'speed': 2.1,
        'deg': 288.228
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-06 09:00:00'
    },
    {
      'dt': 1559822400,
      'main': {
        'temp': 21.45,
        'temp_min': 21.45,
        'temp_max': 21.45,
        'pressure': 1011.29,
        'sea_level': 1011.29,
        'grnd_level': 814.79,
        'humidity': 77,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 20
      },
      'wind': {
        'speed': 4.01,
        'deg': 241.749
      },
      'rain': {
        '3h': 1.562
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-06 12:00:00'
    },
    {
      'dt': 1559833200,
      'main': {
        'temp': 17.95,
        'temp_min': 17.95,
        'temp_max': 17.95,
        'pressure': 1011.83,
        'sea_level': 1011.83,
        'grnd_level': 814.95,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 61
      },
      'wind': {
        'speed': 3.08,
        'deg': 228.354
      },
      'rain': {
        '3h': 5.812
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-06 15:00:00'
    },
    {
      'dt': 1559844000,
      'main': {
        'temp': 14.45,
        'temp_min': 14.45,
        'temp_max': 14.45,
        'pressure': 1015.66,
        'sea_level': 1015.66,
        'grnd_level': 817.27,
        'humidity': 96,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 37
      },
      'wind': {
        'speed': 0.78,
        'deg': 191.712
      },
      'rain': {
        '3h': 4
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-06 18:00:00'
    },
    {
      'dt': 1559854800,
      'main': {
        'temp': 13.75,
        'temp_min': 13.75,
        'temp_max': 13.75,
        'pressure': 1016.24,
        'sea_level': 1016.24,
        'grnd_level': 817.6,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 1
      },
      'wind': {
        'speed': 1.46,
        'deg': 108.286
      },
      'rain': {
        '3h': 0.375
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-06 21:00:00'
    },
    {
      'dt': 1559865600,
      'main': {
        'temp': 13.25,
        'temp_min': 13.25,
        'temp_max': 13.25,
        'pressure': 1014.73,
        'sea_level': 1014.73,
        'grnd_level': 816.06,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 800,
          'main': 'Clear',
          'description': 'clear sky',
          'icon': '01n'
        }
      ],
      'clouds': {
        'all': 1
      },
      'wind': {
        'speed': 1.67,
        'deg': 98.483
      },
      'rain': {},
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-07 00:00:00'
    },
    {
      'dt': 1559876400,
      'main': {
        'temp': 12.75,
        'temp_min': 12.75,
        'temp_max': 12.75,
        'pressure': 1015.52,
        'sea_level': 1015.52,
        'grnd_level': 816.56,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 800,
          'main': 'Clear',
          'description': 'clear sky',
          'icon': '01n'
        }
      ],
      'clouds': {
        'all': 1
      },
      'wind': {
        'speed': 1.94,
        'deg': 85.9
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-07 03:00:00'
    },
    {
      'dt': 1559887200,
      'main': {
        'temp': 18.15,
        'temp_min': 18.15,
        'temp_max': 18.15,
        'pressure': 1017.11,
        'sea_level': 1017.11,
        'grnd_level': 818.54,
        'humidity': 83,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 800,
          'main': 'Clear',
          'description': 'clear sky',
          'icon': '01d'
        }
      ],
      'clouds': {
        'all': 2
      },
      'wind': {
        'speed': 1.46,
        'deg': 52.824
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-07 06:00:00'
    },
    {
      'dt': 1559898000,
      'main': {
        'temp': 22.65,
        'temp_min': 13.41,
        'temp_max': 22.65,
        'pressure': 1014.76,
        'sea_level': 1014.76,
        'grnd_level': 817.42,
        'humidity': 62,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 802,
          'main': 'Clouds',
          'description': 'scattered clouds',
          'icon': '03d'
        }
      ],
      'clouds': {
        'all': 33
      },
      'wind': {
        'speed': 1.82,
        'deg': 290.733
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-07 09:00:00'
    },
    {
      'dt': 1559908800,
      'main': {
        'temp': 21.85,
        'temp_min': 21.85,
        'temp_max': 21.85,
        'pressure': 1011.7,
        'sea_level': 1011.7,
        'grnd_level': 815.2,
        'humidity': 76,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 30
      },
      'wind': {
        'speed': 3.05,
        'deg': 248.883
      },
      'rain': {
        '3h': 2.688
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-07 12:00:00'
    },
    {
      'dt': 1559919600,
      'main': {
        'temp': 18.05,
        'temp_min': 18.05,
        'temp_max': 18.05,
        'pressure': 1012.95,
        'sea_level': 1012.95,
        'grnd_level': 815.91,
        'humidity': 94,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 8
      },
      'wind': {
        'speed': 3.4,
        'deg': 241.48
      },
      'rain': {
        '3h': 5.188
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-07 15:00:00'
    },
    {
      'dt': 1559930400,
      'main': {
        'temp': 14.75,
        'temp_min': 14.75,
        'temp_max': 14.75,
        'pressure': 1017.14,
        'sea_level': 1017.14,
        'grnd_level': 818.46,
        'humidity': 96,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 9
      },
      'wind': {
        'speed': 1.44,
        'deg': 192.053
      },
      'rain': {
        '3h': 3.5
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-07 18:00:00'
    },
    {
      'dt': 1559941200,
      'main': {
        'temp': 13.75,
        'temp_min': 13.75,
        'temp_max': 13.75,
        'pressure': 1017.46,
        'sea_level': 1017.46,
        'grnd_level': 818.65,
        'humidity': 96,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 15
      },
      'wind': {
        'speed': 0.83,
        'deg': 153.342
      },
      'rain': {
        '3h': 0.375
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-07 21:00:00'
    },
    {
      'dt': 1559952000,
      'main': {
        'temp': 13.35,
        'temp_min': 13.35,
        'temp_max': 13.35,
        'pressure': 1015.65,
        'sea_level': 1015.65,
        'grnd_level': 816.98,
        'humidity': 96,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 11
      },
      'wind': {
        'speed': 0.95,
        'deg': 140.218
      },
      'rain': {
        '3h': 0.125
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-08 00:00:00'
    },
    {
      'dt': 1559962800,
      'main': {
        'temp': 13.1,
        'temp_min': 13.1,
        'temp_max': 13.1,
        'pressure': 1016.64,
        'sea_level': 1016.64,
        'grnd_level': 817.55,
        'humidity': 96,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 800,
          'main': 'Clear',
          'description': 'clear sky',
          'icon': '01n'
        }
      ],
      'clouds': {
        'all': 4
      },
      'wind': {
        'speed': 1.64,
        'deg': 104.062
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-08 03:00:00'
    },
    {
      'dt': 1559973600,
      'main': {
        'temp': 18.35,
        'temp_min': 18.35,
        'temp_max': 18.35,
        'pressure': 1018.27,
        'sea_level': 1018.27,
        'grnd_level': 819.36,
        'humidity': 83,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 800,
          'main': 'Clear',
          'description': 'clear sky',
          'icon': '01d'
        }
      ],
      'clouds': {
        'all': 3
      },
      'wind': {
        'speed': 1.12,
        'deg': 49.21
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-08 06:00:00'
    },
    {
      'dt': 1559984400,
      'main': {
        'temp': 21.36,
        'temp_min': 12.88,
        'temp_max': 21.36,
        'pressure': 1016.01,
        'sea_level': 1016.01,
        'grnd_level': 818.19,
        'humidity': 68,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 2
      },
      'wind': {
        'speed': 2.02,
        'deg': 291.06
      },
      'rain': {
        '3h': 2.062
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-08 09:00:00'
    },
    {
      'dt': 1559995200,
      'main': {
        'temp': 20.93,
        'temp_min': 20.93,
        'temp_max': 20.93,
        'pressure': 1012.9,
        'sea_level': 1012.9,
        'grnd_level': 816,
        'humidity': 80,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 8
      },
      'wind': {
        'speed': 3.05,
        'deg': 236.07
      },
      'rain': {
        '3h': 4.688
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-08 12:00:00'
    },
    {
      'dt': 1560006000,
      'main': {
        'temp': 17.75,
        'temp_min': 17.75,
        'temp_max': 17.75,
        'pressure': 1014.1,
        'sea_level': 1014.1,
        'grnd_level': 816.72,
        'humidity': 94,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 2.66,
        'deg': 238.225
      },
      'rain': {
        '3h': 7.062
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-08 15:00:00'
    },
    {
      'dt': 1560016800,
      'main': {
        'temp': 15.75,
        'temp_min': 15.75,
        'temp_max': 15.75,
        'pressure': 1017.66,
        'sea_level': 1017.66,
        'grnd_level': 818.74,
        'humidity': 96,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 97
      },
      'wind': {
        'speed': 1.76,
        'deg': 248.235
      },
      'rain': {
        '3h': 4.438
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-08 18:00:00'
    },
    {
      'dt': 1560027600,
      'main': {
        'temp': 15.45,
        'temp_min': 15.45,
        'temp_max': 15.45,
        'pressure': 1018,
        'sea_level': 1018,
        'grnd_level': 819.09,
        'humidity': 97,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 502,
          'main': 'Rain',
          'description': 'heavy intensity rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 0.37,
        'deg': 279.437
      },
      'rain': {
        '3h': 15.25
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-08 21:00:00'
    },
    {
      'dt': 1560038400,
      'main': {
        'temp': 14.69,
        'temp_min': 14.69,
        'temp_max': 14.69,
        'pressure': 1016.8,
        'sea_level': 1016.8,
        'grnd_level': 817.78,
        'humidity': 97,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 502,
          'main': 'Rain',
          'description': 'heavy intensity rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 0.95,
        'deg': 117.62
      },
      'rain': {
        '3h': 14.125
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-09 00:00:00'
    },
    {
      'dt': 1560049200,
      'main': {
        'temp': 14.05,
        'temp_min': 14.05,
        'temp_max': 14.05,
        'pressure': 1018.07,
        'sea_level': 1018.07,
        'grnd_level': 818.43,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 2.38,
        'deg': 98.928
      },
      'rain': {
        '3h': 5.25
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-09 03:00:00'
    },
    {
      'dt': 1560060000,
      'main': {
        'temp': 14.85,
        'temp_min': 14.85,
        'temp_max': 14.85,
        'pressure': 1019.22,
        'sea_level': 1019.22,
        'grnd_level': 819.6,
        'humidity': 92,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 1.94,
        'deg': 102.062
      },
      'rain': {
        '3h': 1.688
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-09 06:00:00'
    },
    {
      'dt': 1560070800,
      'main': {
        'temp': 21.27,
        'temp_min': 12.77,
        'temp_max': 21.27,
        'pressure': 1016.82,
        'sea_level': 1016.82,
        'grnd_level': 818.42,
        'humidity': 66,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 803,
          'main': 'Clouds',
          'description': 'broken clouds',
          'icon': '04d'
        }
      ],
      'clouds': {
        'all': 69
      },
      'wind': {
        'speed': 1.68,
        'deg': 272.218
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-09 09:00:00'
    },
    {
      'dt': 1560081600,
      'main': {
        'temp': 20.25,
        'temp_min': 20.25,
        'temp_max': 20.25,
        'pressure': 1013.42,
        'sea_level': 1013.42,
        'grnd_level': 816.11,
        'humidity': 80,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'light rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 84
      },
      'wind': {
        'speed': 2.78,
        'deg': 244.551
      },
      'rain': {
        '3h': 2.563
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-09 12:00:00'
    },
    {
      'dt': 1560092400,
      'main': {
        'temp': 18.05,
        'temp_min': 18.05,
        'temp_max': 18.05,
        'pressure': 1014.18,
        'sea_level': 1014.18,
        'grnd_level': 816.41,
        'humidity': 93,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10d'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 1.56,
        'deg': 254.383
      },
      'rain': {
        '3h': 3.625
      },
      'sys': {
        'pod': 'd'
      },
      'dt_txt': '2019-06-09 15:00:00'
    },
    {
      'dt': 1560103200,
      'main': {
        'temp': 14.75,
        'temp_min': 14.75,
        'temp_max': 14.75,
        'pressure': 1017.21,
        'sea_level': 1017.21,
        'grnd_level': 818.29,
        'humidity': 95,
        'temp_kf': 0
      },
      'weather': [
        {
          'id': 501,
          'main': 'Rain',
          'description': 'moderate rain',
          'icon': '10n'
        }
      ],
      'clouds': {
        'all': 100
      },
      'wind': {
        'speed': 0.71,
        'deg': 276.278
      },
      'rain': {
        '3h': 3.063
      },
      'sys': {
        'pod': 'n'
      },
      'dt_txt': '2019-06-09 18:00:00'
    }
  ],
  'city': {
    'id': 198629,
    'name': 'Eldoret',
    'coord': {
      'lat': 0.5198,
      'lon': 35.2715
    },
    'country': 'KE',
    'population': 218446,
    'timezone': 10800
  }
};

export const searchWeatherResult = {
  weather: {
    city: 'Rio de Janeiro',
    condition: 200,
    country: 'BR',
    date: 1559984963000,
    description: 'few clouds',
    humidity: 94,
    icon: '02n',
    icon_id: 801,
    image: 'https://openweathermap.org/img/w/02n.png',
    max: 20,
    min: 16,
    temperature: 17.58,
    wind_speed: 13
  },
  forecast: [
    {
      date: 1560038400000,
      description: 'broken clouds',
      dt_txt: '2019-06-09 00:00:00',
      humidity: 75,
      icon: '04n',
      icon_id: 803,
      image: 'https://openweathermap.org/img/w/04n.png',
      max: 20.58,
      min: 20.58,
      temperature: 20.58,
      wind_speed: 1,
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
    }
  ]
};
