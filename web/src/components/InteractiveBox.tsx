import React from 'react';
import WeatherSearchBox from './WeatherSearchBox';

interface InteractiveBoxProps {
  label: string;
  type: 'text' | 'dropdown';
  options?: string[];
  value: string | number;
  onChange: (value: string) => void;
}

const InteractiveBox: React.FC<InteractiveBoxProps> = ({ label, type, options, value, onChange }) => {

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

export default InteractiveBox;
