/*
This a hash validation for a Telegram Mini App.

https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
*/

import { webcrypto } from 'crypto';
import fetch from 'node-fetch';

const BOT_TOKEN: string | undefined = process.env.BOT_TOKEN;
const SERVER_TOKEN: string | undefined = process.env.SERVER_TOKEN;
const SERVER_IP: string | undefined = process.env.SERVER_IP;

type TransformInitData = {
    [k: string]: string;
};

function transformInitData(initData: string): TransformInitData {
    return Object.fromEntries(new URLSearchParams(initData));
}

async function validate(data: TransformInitData, botToken: string) {
    const encoder = new TextEncoder();

    const checkString = Object.keys(data)
        .filter((key) => key !== "hash")
        .map((key) => `${key}=${data[key]}`)
        .sort()
        .join("\n");

    const subtle = webcrypto.subtle;

    const secretKey = await subtle.importKey(
        "raw",
        encoder.encode("WebAppData"),
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign"]
    );
    const secret = await subtle.sign("HMAC", secretKey, encoder.encode(botToken));
    const signatureKey = await subtle.importKey(
        "raw",
        secret,
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign"]
    );
    const signature = await subtle.sign(
        "HMAC",
        signatureKey,
        encoder.encode(checkString)
    );

    const hex = Buffer.from(signature).toString('hex');

    return data.hash === hex;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!BOT_TOKEN || !SERVER_TOKEN || !SERVER_IP) {
        return {"error": "Server config is not set", "ok": false};
    }

    const { initData } = body;

    if (!initData) {
        return {"error": "Invalid request", "ok": false};
    }

    const data = transformInitData(initData);
    const userId = JSON.parse(data.user).id;

    const isValid = await validate(data, BOT_TOKEN);

    if (isValid) {
        const response = await (await fetch(
            `${SERVER_IP}/api/user/${userId}/token`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "token": process.env.SERVER_TOKEN || "",
                },
            }
        )).json() as { token: string };
        return { "ok": true, "token": response.token, "error": undefined };
    } else {
        return { "ok": false, "error": "Invalid hash" };
    }
});
