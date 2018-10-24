import * as azdev from 'azure-devops-node-api'

import config from './config'

let handler = azdev.getPersonalAccessTokenHandler(config.azure.token)
export default new azdev.WebApi(config.azure.url, handler)