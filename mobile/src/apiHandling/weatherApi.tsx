export async function sendWeather(data: WeatherData, ip: String) {
  console.log('http://' + ip + ':8080/weather');
  try {
    const response = await fetch('http://' + ip + ':8080/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const responseData = await response.json();
    return {data: responseData, error: null};
  } catch (error) {
    console.error('Error sending data:', error);
    console.log(JSON.stringify(data));
    return {data: null, error};
  }
}

interface WeatherData {
  city: string;
  forecast: {
    type: 'temperature' | 'wind' | 'humidity';
    value: number;
  };
  interval: '>' | '<' | '=';
  message?: string;
}
