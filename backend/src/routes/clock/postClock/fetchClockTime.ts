import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";
import { ClockData } from "./postClock.interface";


const NINJA_CLOCK_URL = "https://api.api-ninjas.com/v1/worldtime?";
const NINJA_CLOCK_API_KEY = "/ddC9MCvB/irjCRskuw+Eg==DaIuTQHdsL7JSJFg";

interface FetchClockResponseFailure {
    error: Error;
    data: null;
}

interface FetchClockResponseSuccess {
    error: null;
    data: { city: string, timezone: string, datetime: string };
}

type FetchClockResponse = FetchClockResponseSuccess | FetchClockResponseFailure;

interface ClockQuery {
    city: string;
};

interface ClockResponse {
    city: string;
    timezone: string;
    datetime: string;
}

export function fetchClock({city}: ClockQuery): Promise<FetchClockResponse> {
    const params = new URLSearchParams({city})
    return fetch(NINJA_CLOCK_URL + params.toString(), {
        method: "GET",
        headers: {
            "X-Api-Key": NINJA_CLOCK_API_KEY,
    }}).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new ErrorStatus("Error fetching Clock data", res.status)
            }
        }
    ).then((res: ClockResponse): FetchClockResponseSuccess => {
        return {data: {city: city, timezone: res.timezone, datetime: res.datetime}, error: null}
    }).catch((err) => {
        return {data: null, error:err};
    });
}
