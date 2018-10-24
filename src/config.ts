import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

const file = process.env.DOCKER_CONFIG_FILE 
    ? process.env.DOCKER_CONFIG_FILE 
    : path.resolve(__dirname, '..', 'config.yml')
const buff = fs.readFileSync(file).toString()

export default <IConfig> yaml.load(buff)