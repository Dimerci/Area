export type ClockData = {
  city: string;
  message?: string;
};

export type WeatherData = {
  clientId: string;
  city: string;
  forecast: {
    type: 'temperature' | 'wind' | 'humidity';
    value: number;
  };
  interval: '>' | '<' | '=';
  reaction?: {
    type: 'Discord';
    message: string;
  };
};

export type AReaItemsT = {
  city: string;
  forecast: {
    type: 'temperature' | 'wind' | 'humidity';
    value: number;
  };
  interval: '>' | '<' | '=';
  reaction?: {
    type: 'Discord';
    message: string;
  };
};

export type JokeData = {
  jokeType:
    | 'animal'
    | 'career'
    | 'celebrity'
    | 'dev'
    | 'explicit'
    | 'fashion'
    | 'food'
    | 'history'
    | 'money'
    | 'movie'
    | 'music'
    | 'political'
    | 'religion'
    | 'science'
    | 'sport'
    | 'travel';
  reaction?: {
    type: 'Discord';
    message: string;
  };
};

export type DiscordMessage = {
  message: string;
};

export type ActionData = {
  weatherData?: WeatherData;
  clockData?: ClockData;
};
