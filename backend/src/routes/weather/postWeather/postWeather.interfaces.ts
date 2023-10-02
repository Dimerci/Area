export type Forecast = {
    type: "wind";
    value: number;
} | {
    type: "temperature"
    value: number
} | {
    type: "humidity"
    value: number
}

export type Interval = ">" | "<" | "=" | ">=" | "<="

export interface OpenWeatherMetrics {
    main: {
        temp: number;
        humidity: number;
    },
    wind: {
        speed: number;
    }
}