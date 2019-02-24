import azure from './azure'
import createBot from './bot'
import createWebhook from './webhook'

const bot = createBot()
const webhook = createWebhook()

webhook.on('build.complete', async build => {
    console.log('build.complete', build)
    
    const projectId = build.resourceContainers.project.id
    const project = await getProject(projectId)
    console.log('project', project)
    const definition = await getBuildDefinition(build.resource.definition.id, projectId)
    console.log('definition', definition)

    const commitSha = /:([a-zA-Z0-9]+)$/.exec(build.resource.sourceGetVersion)[1]

    bot.buildComplete({
        commit: definition.repository.properties.manageUrl + '/commit/' + commitSha,
        commitSha: commitSha,
        buildNumber: build.resource.buildNumber,
        buildUrl: /\(([^)]+)\)/.exec(build.message.markdown)[1],
        message: build.message.text,
        project: project.name,
        queue: build.resource.queue.name
    })
})

async function getBuildDefinition(id: number, projectId: string) {
    const build = await azure.getBuildApi()
    let def = await build.getDefinition(id, projectId)

    return def
}

async function getProject(id: string) {
    const core = await azure.getCoreApi()
    const projects = await core.getProjects()
    return projects.find(proj => proj.id == id)
}
