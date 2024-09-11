

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

type LogsAnswer = {
    answer: {
        logs: string
    }
}

type StatsAnswer = {
    answer: {
        stats: {
            cpu_stats: {
                total_usage: number
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