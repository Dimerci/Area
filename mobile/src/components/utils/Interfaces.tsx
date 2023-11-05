export type ClockData = {
  city: string;
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
    type: 'Discord' | 'Chuck Norris' | 'Meal' | 'Clock';
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
    type: 'Discord' | 'Chuck Norris' | 'Meal' | 'Clock';
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
};

export type DiscordMessage = {
  message: string;
};

export type ActionData = {
  weatherData?: WeatherData;
  clockData?: ClockData;
};

export type AreaBoxT = {
  debugScreen?: boolean;
  debugConsole?: boolean;
  actionData: ActionData;
};
