export async function getMeal(ip: string) {
  try {
    const url = `http://${ip}:8080/mealDb`;
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

    if (responseData.ingredients && responseData.instructions) {
      console.log(
        'Success: ' + responseData.ingredients + responseData.instructions,
      );
      return {
        ingredients: responseData.ingredients,
        instructions: responseData.instructions,
      };
    } else {
      console.error('Unexpected response format:', responseData);
      return {data: null, error: 'Unexpected response format'};
    }
  } catch (error) {
    console.error('Error sending data:', error);
    return {data: null, error};
  }
}
