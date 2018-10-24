interface IConfig {
    azure: {
        token: string
        url: string
    }

    bot: {
        enable: boolean
        channel_id: string
        token: string
    }

    webhook: {
        auth_token: string
        enable: boolean
        listen_port: number
    }
}