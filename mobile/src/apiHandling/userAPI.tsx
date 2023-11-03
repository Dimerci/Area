import {JokeData} from '../components/utils/Interfaces';

export async function getUserData(clientId: string, ip: string) {
  try {
    const url = `http://${ip}:8080/user?clientId=${clientId}`;
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

    if (responseData.clientJson) {
      console.log('Success: ' + responseData.clientJson);
      return responseData.clientJson;
    } else {
      console.error('Unexpected response format:', responseData);
      return {data: null, error: 'Unexpected response format'};
    }
  } catch (error) {
    console.error('Error sending data:', error);
    return {data: null, error};
  }
}
