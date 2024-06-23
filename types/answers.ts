

type ValidatorAnswer = {
    error: string;
    ok: boolean;
    token: string;
};

type InfoAnswer = {
    answer: {
        host: {
            id: number,
            end_date: string,
            server_id: number,
            port: number,
            rate: number,
            name: string,
            start_date: string
        }
    }
};


export type { ValidatorAnswer, InfoAnswer };