import {DiscordMessage} from '../components/Interfaces';

export async function sendDiscordMessage(data: DiscordMessage, ip: String) {
  try {
    const response = await fetch('http://' + ip + ':8080/discord', {
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
