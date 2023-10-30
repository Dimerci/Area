// export type SettingsRea = {
//   ip: String;
// };

export type WeatherData = {
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
};
