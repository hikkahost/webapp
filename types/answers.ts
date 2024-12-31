

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
        },
        server: {
            id: number,
            max_users: number,
            users: number,
            name: string,
            city: string,
            country_code: string,
            ip: string,
            banner: string,
        }
    } | {
        status_code: number,
        detail: string,
    }
};

type LogsAnswer = {
    answer: {
        logs: string
    }
}

type StatsAnswer = {
    answer: {
        stats: {
            cpu_stats: {
                cpu_usage: {
                    total_usage: number
                }
                system_cpu_usage: number
            }
            memory_stats: {
                usage: number
            }
        }
    },
    ping: number
}

export type { ValidatorAnswer, InfoAnswer, LogsAnswer, StatsAnswer };