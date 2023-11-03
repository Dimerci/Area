import React from 'react';

export interface Forecast {
  name: string;
  value: number;
}

export interface Reaction {
  type: string;
  message: string;
}

export interface Action {
  type: string;
  city: string;
  forecast: Forecast;
  interval: string;
  reaction: Reaction;
}

export interface ActionCardProps {
  data: Action[];
}

export const ActionCard: React.FC<ActionCardProps> = ({ data }) => {
  console.log("data =", data[0].forecast.name);

  return (
    <div>
      <h2>Weather Information</h2>
      {/* {data.map((item, index) => ( */}
        {/* <ul key={index}> */}
          <li>Type: {data[0].type}</li>
          <li>City: {data[0].city}</li>
          <li>
            Forecast:
            <ul>
              <li>Type: {data[0].forecast.name}</li>
              <li>Value: {data[0].forecast.value}</li>
            </ul>
          </li>
          <li>Interval: {data[0].interval}</li>
          <li>
            Reaction:
            <ul>
              <li>Type: {data[0].reaction.type}</li>
              <li>Message: {data[0].reaction.message}</li>
            </ul>
          </li>
        {/* </ul> */}
      {/* ))} */}
    </div>
  );
};

export default ActionCard;
