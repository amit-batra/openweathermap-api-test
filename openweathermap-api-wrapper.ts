type WeatherParams = {
  units?: 'imperial' | 'metric';
} & ({
  city: string;
  zip?: never;
} | {
  zip: string | number;
  city?: never;
});

type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const client = async ({
  city,
  zip,
  units = 'imperial',
}: WeatherParams): Promise<WeatherResponse> => {
  const apiKey = '<YOUR OPENWEATHERMAP API KEY>'; // Replace with your OpenWeatherMap API key
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const url = new URL(baseUrl);
    if (city) {
      url.searchParams.append('q', city);
    } else if (zip) {
      url.searchParams.append('zip', zip.toString());
    }
    url.searchParams.append('units', units);
    url.searchParams.append('appid', apiKey);

    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const apiTool = {
  name: 'OpenWeatherMap_Current_API',
  description: 'Fetch current weather data from OpenWeatherMap.',
  function: client,
  input_schema: {
    type: 'object',
    properties: {
      city: {
        type: 'string',
        description: 'The city name for the location.',
      },
      zip: {
        type: 'string',
        description: 'The zip code for the location.',
      },
      units: {
        type: 'string',
        enum: ['imperial', 'metric'],
        description: 'The unit system to use for the weather data.',
      },
    },
    required: ['city'],
    additionalProperties: false,
  },
};

export { client, WeatherParams, WeatherResponse };