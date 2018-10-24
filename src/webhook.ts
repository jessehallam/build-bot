import * as bodyParser from 'body-parser'
import * as express from 'express'
import { EventEmitter } from 'events'

import config from './config'

export default function createWebHookListener() {
    const app = express()
    const emitter = new EventEmitter()

    app.use(bodyParser.json())
    app.use((req, res, next) => {
        if (isWebHookRequest(req)) {
            emitter.emit(req.body.eventType, req.body)
            res.sendStatus(200)
        } else next()
    })

    if (config.webhook.enable) {
        app.listen(config.webhook.listen_port, () => {
            console.log(`[webhook] Listening on port ${config.webhook.listen_port}`)
        })
    }

    return emitter
}

function isWebHookRequest(req: express.Request) {
    return req.method === 'POST' &&
        typeof req.body === 'object' &&
        typeof req.body.eventType === 'string'
}