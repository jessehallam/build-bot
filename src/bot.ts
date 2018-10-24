import * as Discord from 'discord.js'

import config from './config'

interface IBuildCompleteInfo {
    commit: string
    commitSha: string
    buildNumber: string
    buildUrl: string
    message: string
    project: string
    queue: string
}

export default function createBot() {
    const client = new Discord.Client()

    client.on('ready', () => {
        console.log(`[bot] Now signed in.`)
    })

    if (config.bot.enable) {
        client.login(config.bot.token)
    }

    return {
        buildComplete(info: IBuildCompleteInfo) {
            if (!config.bot.enable) return
            let channel = <Discord.TextChannel> client.channels.get(config.bot.channel_id)
            let embed = new Discord.RichEmbed()
                .setColor(0xf4f142)
                .setTitle(info.message)
                .setURL(info.buildUrl)
                .setTimestamp(new Date())
                .setFooter('Azure DevOps', 'https://azurecomcdn.azureedge.net/cvt-c8c25e81432b2564b126c4a01fde1d9ee2e5fe1a4390e6a8494c91255fd5b2c3/images/shared/services/devops/pipelines-icon-80.png')
                .addField('Project', info.project)
                .addField('Queue', info.queue)
                .addField('Commit', `[${info.commitSha}](${info.commit})`)

            channel.send({ embed })
        }
    }
}