
import { WeatherData } from "./WeatherSearchBox";

export async function sendWeather(data: WeatherData) {
    try {
        const response = await fetch('http://localhost:8080/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        

        const responseData = await response.json();
        return { data: responseData, error: null };

    } catch (error) {
        console.error("Error sending data:", error);
        return { data: null, error };
    }
}
