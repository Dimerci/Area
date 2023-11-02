import { User } from "@auth0/auth0-react";

export async function sendUserIdDb(clientId: string) {
    try {
        const response = await fetch(`http://localhost:8080/user?clientId=${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const responseData = await response.json();
        console.log(responseData)
        return { data: responseData, error: null };

    } catch (error) {
        console.error("Error sending data:", error);
        return { data: null, error };
    }
}
