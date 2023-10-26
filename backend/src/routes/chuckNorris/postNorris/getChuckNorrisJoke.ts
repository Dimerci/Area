import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";

interface postNorris {
    message: string,
}

export async function getChuckNorrisJoke({ message }: postNorris) {
    try {
        let apiUrl = 'https://api.chucknorris.io/jokes/random';

        if (message != null && message.trim() !== '') {
            apiUrl += `?category=${encodeURIComponent(message)}`;
        }
        console.log(apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new ErrorStatus("Error fetching Chuck Norris joke", response.status);
        }

        const chuckNorrisData = await response.json();
        const joke = chuckNorrisData.value;

        console.log('Chuck Norris Joke:', joke);
        return joke;
    } catch (err) {
        console.error(err);
        return { data: null, error: err };
    }
}
