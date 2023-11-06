import {JokeData} from '../components/utils/Interfaces';

export async function getJoke(data: JokeData, ip: string) {
  try {
    const url = `http://${ip}:8080/norris?category=${data.jokeType}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const responseData = await response.json();

    if (responseData.joke) {
      console.log('Success: ' + responseData.joke);
      return responseData.joke;
    } else {
      console.error('Unexpected response format:', responseData);
      return {data: null, error: 'Unexpected response format'};
    }
  } catch (error) {
    console.error('Error sending data:', error);
    console.log(JSON.stringify(data));
    return {data: null, error};
  }
}
