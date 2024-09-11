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

    let start_time = new Date();
    const response = await fetch(
        `${SERVER_IP}/api/host/${userId}/logs/all`,
        {
            headers: {
                "Content-Type": "application/json",
                "token": token.toString()
            },
        }
    );
    let ping = new Date().getTime() - start_time.getTime();

    const data = await response.json();

    return { "answer": data, "error": undefined, "ping": ping };
});
