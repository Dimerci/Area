import React, { useState, useContext } from 'react';
import { sendWeather } from './WeatherAPI';
import { useAuth0 } from '@auth0/auth0-react';

export interface WeatherData {
    clientId: string;
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
    const { user } = useAuth0();
    const [city, setCity] = useState('');
    const [forecastType, setForecastType] = useState<'Temperature' | 'Wind' | 'Humidity'>('Temperature');
    const [value, setValue] = useState(0);
    const [interval, setInterval] = useState<'Greater Than' | 'Less Than' | 'Equals'>('Greater Than');
    const [reactionType, setReactionType] = useState('Discord');
    const [reactionMessage, setReactionMessage] = useState('');
    const [selectedService, setServiceType] = useState<string | null>(null);

    const handleSubmit = async () => {
        const intervalValueMap: { [key in 'Greater Than' | 'Less Than' | 'Equals']: '>' | '<' | '=' } = {
            'Greater Than': '>',
            'Less Than': '<',
            'Equals': '='
        };
        const data: WeatherData = {
            clientId: user?.email || 'hi',
            city,
            forecast: {
              type: forecastType.toLowerCase() as 'temperature' | 'wind' | 'humidity',
              value: value,
            },
            interval: intervalValueMap[interval] as '>' | '<' | '=',
            reaction: {
              type: reactionType,
              message: reactionMessage,
            },
          };

        const result = await sendWeather(data);
        if (result?.error) {
            console.error("Error sending data:", result.error);
        } else if (result?.data) {
            console.log("Data sent successfully:", result.data);
        }
    };

    return (
        <div className="flex items-center justify-center my-10 ">
            <div className="relative p-10 w-full max-w-3xl rounded-lg shadow-xl border border-teal-300 space-y-6">
                {/* Cross icon at the top left */}
                <a href="http://localhost:8081/inside">
                    <button
                        onClick={() => setServiceType(null)}
                        className="absolute top-4 left-4 bg-teal-300 text-teal-900 px-2 py-1 rounded-full shadow-lg font-medium hover:bg-teal-400 active:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </a>
                <h2 className="text-3xl font-bold text-center mb-8 text-teal-800">SET PARAMS</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <button
                            onClick={() => setServiceType('Weather')}
                            className={`w-full py-2 px-4 rounded-lg text-lg ${selectedService === 'Weather' ? 'bg-teal-600 text-white' : 'bg-teal-600 text-white'} hover:shadow-md transition-all duration-300`}
                        >
                            WEATHER
                        </button>
                    </div>
                    <div>
                        <label className="font-medium text-lg mb-2 block">City</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="col-span-2">
                        <label className="font-medium text-lg mb-2 block">Forecast Type</label>
                        <div className="flex space-x-1">
                            {['Temperature', 'Wind', 'Humidity'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setForecastType(type as 'Temperature' | 'Wind' | 'Humidity')}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm ${forecastType === type ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-md transition-all duration-300`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="font-medium text-lg mb-2 block">Value: {value}</label>
                        <input type="range" min="-100" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="col-span-2">
                        <label className="font-medium text-lg mb-2 block">Interval</label>
                        <div className="flex space-x-2">
                            {['Greater Than', 'Less Than', 'Equals'].map(intvl => (
                                <button
                                    key={intvl}
                                    onClick={() => setInterval(intvl as 'Greater Than' | 'Less Than' | 'Equals')}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm ${interval === intvl ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-md transition-all duration-300`}
                                >
                                    {intvl}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="font-medium text-lg mb-2 block">Reaction Type</label>
                        <div className="flex space-x-1 mb-2">
                            {['Discord', 'OtherType1', 'OtherType2'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setReactionType(type)}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm ${reactionType === type ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'} hover:shadow-md transition-all duration-300`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        {reactionType === 'Discord' && (
                            <div>
                                <label className="font-medium text-lg mb-2 block">Reaction Message</label>
                                <input type="text" value={reactionMessage} onChange={(e) => setReactionMessage(e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-teal-600 text-white px-8 py-2 rounded-lg shadow-lg font-medium hover:bg-teal-700 active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 w-full">Send Alert</button>
            </div>
        </div>
    );

    return null;

};

export default WeatherSearchBox;
