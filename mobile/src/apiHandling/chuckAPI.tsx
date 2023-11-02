import {DiscordMessage, JokeData} from '../components/Interfaces';
import {sendDiscordMessage} from './discordMessage';

export async function sendJoke(data: JokeData, ip: String) {
  try {
    const response = await fetch(
      'http://' + ip + ':8080/norris?category=' + JSON.stringify(data.jokeType),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data.jokeType),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const responseData = await response.json();
    const message: DiscordMessage = {
      message:
        'The Joke:\n------------\n  « ' +
        responseData.joke +
        ' »\n' +
        data.reaction?.message,
    };

    sendDiscordMessage(message, ip);
    console.log('Success');
    // return responseData;
  } catch (error) {
    console.error('Error sending data:', error);
    console.log(JSON.stringify(data));
    return {data: null, error};
  }
}

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
