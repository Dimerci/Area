import React, { useState } from 'react';
import { sendWeather } from './WeatherAPI';

export interface WeatherData {
    city: string;
    forecast: {
        type: 'temperature' | 'wind' | 'humidity';
        value: number;
    };
    interval: '>' | '<' | '=';
    reaction: {
        type: string;
        message: string;
    }
}

const WeatherSearchBox: React.FC = () => {
    const [city, setCity] = useState('');
    const [forecastType, setForecastType] = useState<'Temperature' | 'Wind' | 'Humidity'>('Temperature');
    const [value, setValue] = useState(0);
    const [interval, setInterval] = useState<'Greater Than' | 'Less Than' | 'Equals'>('Greater Than');
    const [reactionType, setReactionType] = useState('Discord');
    const [reactionMessage, setReactionMessage] = useState('');
    const [serviceType, setServiceType] = useState('Weather');

    const handleSubmit = async () => {
        const intervalValueMap: { [key in 'Greater Than' | 'Less Than' | 'Equals']: '>' | '<' | '=' } = {
            'Greater Than': '>',
            'Less Than': '<',
            'Equals': '='
        };
    
        const data: WeatherData = {
            city,
            forecast: {
                type: forecastType.toLowerCase() as 'temperature' | 'wind' | 'humidity',
                value: value
            },
            interval: intervalValueMap[interval] as '>' | '<' | '=',
            reaction: {
                type: reactionType,
                message: reactionMessage
            }
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
            <div className="bg-white p-8 w-80 rounded-lg shadow-xl border border-gray-200 transition-all duration-300 space-y-4">
                <h2 className="text-2xl font-semibold text-center mb-4">Alert Setup</h2>
                <InteractiveBox label="Service Type" type="dropdown" options={['Weather']} value={serviceType} onChange={setServiceType} />
                <InteractiveBox label="City" type="text" value={city} onChange={setCity} />
                <div className="flex space-x-2 justify-center">
                    {['Temperature', 'Wind', 'Humidity'].map(type => (
                        <button
                            key={type}
                            onClick={() => setForecastType(type as 'Temperature' | 'Wind' | 'Humidity')}
                            className={`px-3 py-1 rounded ${forecastType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm font-medium mb-2">Value: {value}</span>
                    <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full"/>
                </div>
                <InteractiveBox label="Interval" type="dropdown" options={['Greater Than', 'Less Than', 'Equals']} value={interval} onChange={(val) => setInterval(val as 'Greater Than' | 'Less Than' | 'Equals')} />
                <InteractiveBox label="Reaction Type" type="text" value={reactionType} onChange={setReactionType} />
                <InteractiveBox label="Reaction Message" type="text" value={reactionMessage} onChange={setReactionMessage} />
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg font-medium hover:bg-blue-600 transition-colors duration-300 w-full">Send Alert</button>
            </div>
        </div>
    );
};

const InteractiveBox: React.FC<{
    label: string,
    type: 'text' | 'dropdown',
    options?: string[],
    value: string | number,
    onChange: (value: string) => void
}> = ({ label, type, options, value, onChange }) => {
    return (
        <div className="py-2">
            <label className="block mb-2 text-sm font-medium">{label}</label>
            {type === 'text' && <input className="border p-2 rounded w-full text-sm" type="text" value={value} onChange={(e) => onChange(e.target.value)} />}
            {type === 'dropdown' && (
                <select className="border p-2 rounded w-full text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
                    {options?.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            )}
        </div>
    );
};

export default WeatherSearchBox;
