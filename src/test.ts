import azure from './azure'

(async function () {
    const build = await azure.getBuildApi()
    const bdef = await build.getDefinition(14, 'b948c6c7-8c6d-4ee6-b419-8503b2379049')

    console.log(bdef.repository.properties.manageUrl + '/commit/' + 'adsf')
})()