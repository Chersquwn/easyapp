// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ncu from 'npm-check-updates'
import spawn from 'cross-spawn'
import path from 'path'
import chalk from 'chalk'
import { getPackageManager } from './index'

const { cyan } = chalk

export default async function install(name: string): Promise<void> {
  const command = getPackageManager()
  const root = path.resolve(name)
  const args = []

  await ncu.run({
    jsonUpgraded: true,
    packageManager: 'npm',
    silent: true,
    packageFile: `./${name}/package.json`
  })

  if (command === 'yarn') {
    args.push('--cwd', root)
  }

  args.push('--silent')

  try {
    spawn.sync(command, args, { stdio: 'ignore', cwd: root })
  } catch (error) {
    console.log(`  ${cyan(command)} has failed.`)
  }
}
