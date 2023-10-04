import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";

export async function postRequestToDiscord(message: string) {
    const requestBody = {
        message: message
    };

    return fetch("http://localhost:8081/discord", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
    }).then((res) => {
        if (res.ok) {
            return;
        } else {
            throw new ErrorStatus("Error sending POST request to Discord", res.status);
        }
    }).catch((err) => {
        return {data: null, error:err};
    });
}
