import { webcrypto } from 'crypto';
//import fetch from 'node-fetch';

const BOT_TOKEN: string | undefined = process.env.BOT_TOKEN;

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

    if (!BOT_TOKEN) {
        return {"error": "Bot token is not set"};
    }

    const { hash, initData } = body;

    if (!hash || !initData) {
        return {"error": "Invalid request"};
    }

    const data = transformInitData(initData);

    const isValid = await validate(data, BOT_TOKEN);

    return { "ok": isValid };
});
