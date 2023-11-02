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
