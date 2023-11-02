import {WeatherData} from '../components/utils/Interfaces';

export async function sendWeather(data: WeatherData, ip: String) {
  console.log(JSON.stringify(data));
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

    // const responseData = await response.json();
    console.log('Success');
    // return {data: responseData, error: null};
  } catch (error) {
    console.error('Error sending data:', error);
    console.log(JSON.stringify(data));
    return {data: null, error};
  }
}
