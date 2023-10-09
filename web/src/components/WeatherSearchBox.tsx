import React, { useState } from 'react';
import { sendWeather } from './WeatherAPI';
import weatherLogo from '../assets/weather.png';

export interface WeatherData {
    city: string;
    forecast: {
        type: string;
        value: number;
    };
    interval: string;
    message: string;
}

const WeatherSearchBox: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [city, setCity] = useState('');
    const [forecastType, setForecastType] = useState('wind');
    const [value, setValue] = useState(0);
    const [interval, setInterval] = useState('>');
    const [message, setMessage] = useState('');

    console.log("WeatherSearchBox is rendered");

    const handleSubmit = async () => { 
        console.log("handleSubmit called");
        const data: WeatherData = { 
            city,
            forecast: {
                type: forecastType,
                value
            },
            interval,
            message
        };
    
        console.log("Data to send:", data);
    
        const result = await sendWeather(data);
        if (result && result.error) {  // Check for result before accessing its properties
            console.error("Error sending data:", result.error);
        } else if (result && result.data) { 
            console.log("Data sent successfully:", result.data); 
        }
    };

    return (
        <div
            className="flex flex-col items-center mt-10 p-4 bg-gray-300 rounded-lg shadow-xl border-2 border-black cursor-pointer"
        >
            {!showForm ? (
                <img
                    src={weatherLogo}
                    alt="Weather Logo"
                    style={{ width: '10%', height: '10%' }}
                    onClick={() => setShowForm(true)}
                />
            ) : (
                <div className="w-full">
                    <button onClick={() => console.log("Test button clicked!")}>Test Button</button>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                    <select value={forecastType} onChange={(e) => setForecastType(e.target.value)}>
                        <option value="wind">Wind</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Humidity</option>
                    </select>
                    <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} placeholder="Value" />
                    <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                        <option value=">">Greater Than</option>
                        <option value="<">Less Than</option>
                        <option value="=">Equals</option>
                    </select>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
                    <button onClick={() => { console.log("Direct click handler triggered"); handleSubmit(); }}>Send</button>
                </div>
            )}
        </div>
    );
};

export default WeatherSearchBox;
