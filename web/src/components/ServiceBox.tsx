import React from 'react';
import WeatherSearchBox from './WeatherSearchBox';

interface ServiceBoxProps {
  selectedService: string;
  onSelectService: (service: string) => void;
  onSetupParameters: () => void;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({ selectedService, onSelectService }) => {
    return (
      <div className="p-10 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-teal-800">CHOOSE YOUR ACTION</h2>
        
        {!selectedService && (
          <div className="mb-4">
            <label className="font-medium text-lg mb-2 block">Service Type</label>
            {['Weather', 'Service 1', 'Service 2'].map(service => (
              <div 
                  key={service}
                  onClick={() => onSelectService(service)} 
                  className={`mb-2 py-3 px-4 rounded-lg text-lg cursor-pointer bg-gray-200 text-gray-700 hover:shadow-md transition-all duration-300`}
              >
                  {service}
              </div>
            ))}
          </div>
        )}

        {selectedService === 'Weather' && <WeatherSearchBox />}
        {/* Add similar conditions for other services as they get implemented */}
      </div>
    );
};

  export default ServiceBox;
  
