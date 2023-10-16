import React, { useState } from 'react';
import { sendWeather } from './WeatherAPI';

export interface WeatherData {
    city: string;
    forecast: {
        type: 'temperature' | 'wind' | 'humidity';
        value: number;
    };
    interval: '>' | '<' | '=';
    message: string;
}

const WeatherSearchBox: React.FC = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [city, setCity] = useState('');
    const [forecastType, setForecastType] = useState<'Temperature' | 'Wind' | 'Humidity'>('Temperature');
    const [value, setValue] = useState('');
    const [interval, setInterval] = useState<'Greater Than' | 'Less Than' | 'Equals'>('Greater Than');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const intervalValueMap: { [key in 'Greater Than' | 'Less Than' | 'Equals']: '>' | '<' | '=' } = {
            'Greater Than': '>',
            'Less Than': '<',
            'Equals': '='
        }

        const data: WeatherData = {
            city,
            forecast: {
                type: forecastType.toLowerCase() as 'temperature' | 'wind' | 'humidity',
                value: Number(value)
            },
            interval: (intervalValueMap[interval] as WeatherData["interval"]),
            message
        };

        const result = await sendWeather(data);
        if (result?.error) {
            console.error("Error sending data:", result.error);
        } else if (result?.data) {
            console.log("Data sent successfully:", result.data);
        }
    };

    return (
        <div className="flex items-center justify-center m-4">
            <div className="bg-white p-4 w-64 h-64 rounded-lg shadow-xl border border-gray-200 transition-all duration-300">
                {!showOptions ? (
                    <button 
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:brightness-150"
                        onClick={() => setShowOptions(true)}
                    >
                        Show Options
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        <InteractiveBox label="City" type="text" value={city} onChange={setCity} />
                        <InteractiveBox label="Forecast Type" type="dropdown" options={['Temperature', 'Wind', 'Humidity']} value={forecastType} onChange={(val) => setForecastType(val as 'Temperature' | 'Wind' | 'Humidity')} />
                        <InteractiveBox label="Value" type="number" value={value} onChange={setValue} />
                        <InteractiveBox label="Interval" type="dropdown" options={['Greater Than', 'Less Than', 'Equals']} value={interval} onChange={(val) => setInterval(val as 'Greater Than' | 'Less Than' | 'Equals')} />
                        <InteractiveBox label="Message" type="text" value={message} onChange={setMessage} />
                        <div className="col-span-2 flex justify-center">
                            <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1 rounded">Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const InteractiveBox: React.FC<{
    label: string,
    type: 'text' | 'number' | 'dropdown',
    options?: string[],
    value: string | number,
    onChange: (value: string) => void
}> = ({ label, type, options, value, onChange }) => {
    return (
        <div className="py-1">
            <label className="block mb-1 text-sm font-medium">{label}</label>
            {type === 'text' && <input className="border p-1 rounded w-full text-sm" type="text" value={value} onChange={(e) => onChange(e.target.value)} />}
            {type === 'number' && <input className="border p-1 rounded w-full text-sm" type="number" value={value} onChange={(e) => onChange(e.target.value)} />}
            {type === 'dropdown' && (
                <select className="border p-1 rounded w-full text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
                    {options?.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            )}
        </div>
    );
};

export default WeatherSearchBox;
