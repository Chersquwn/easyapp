import semver from 'semver'
import chalk from 'chalk'
import request from 'request-promise-native'
import { version, engines, name } from '../../package.json'
import { NPM_REGISTER_URL } from '../constants'

const { red, yellow, green } = chalk

export function checkNodeVersion(): void {
  if (!semver.satisfies(process.version, engines.node)) {
    console.log(
      red(`   You must upgrade node to ${engines.node}.x to use ${name}.`)
    )
    process.exit(1)
  }
}

export function checkPackageVersion(): void {
  try {
    const { body } = request.get(NPM_REGISTER_URL + name, { json: true })
    const latestVersion = JSON.parse(body.toString())['dist-tags'].latest

    if (semver.lt(version, latestVersion)) {
      console.log(yellow(`    A newer version for ${name} is available.`))
      console.log()
      console.log(`   latest version: ${green(latestVersion)}`)
    }
  } catch (error) {
    console.log(red('Error' + error))
  }
}
