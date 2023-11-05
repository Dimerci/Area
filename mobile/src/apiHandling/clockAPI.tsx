import {ClockData} from '../components/utils/Interfaces';

export async function postClock(data: ClockData, ip: String) {
  try {
    const response = await fetch('http://' + ip + ':8080/clock', {
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
