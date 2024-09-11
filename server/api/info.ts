import fetch from 'node-fetch';

const SERVER_IP: string | undefined = process.env.SERVER_IP;


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!SERVER_IP) {
        return {"error": "Server config is not set", "answer": {}};
    }

    const { token, userId } = body;

    if (!token || !userId) {
        return {"error": "Invalid request", "answer": {}};
    }

    const response = await fetch(
        `${SERVER_IP}/api/host/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "token": token.toString()
            },
        }
    );

    const data = await response.json();
    console.log(data);

    return { "answer": data, "error": undefined };
});
