import fetch from 'node-fetch';

const SERVER_IP: string | undefined = process.env.SERVER_IP;
const SERVER_TOKEN: string | undefined = process.env.SERVER_TOKEN;


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
                "token": SERVER_TOKEN ? SERVER_TOKEN.toString() : token.toString(),
            },
        }
    );

    const data = await response.json();

    return { "answer": data, "error": undefined };
});
