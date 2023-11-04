export async function getUserData(clientId: string, ip: string) {
  try {
    const url = `http://${ip}:8080/user?clientId=${clientId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const responseData = await response.json();

    if (responseData.data) {
      console.log('Success: ' + responseData.data);
      return responseData.data;
    } else {
      console.error('Unexpected response format:', responseData);
      return {data: null, error: 'Unexpected response format'};
    }
  } catch (error) {
    console.error('Error sending data:', error);
    return {data: null, error};
  }
}
