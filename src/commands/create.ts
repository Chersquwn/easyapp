import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import generate from '../utils/generate'
import download from '../utils/download'
import install from '../utils/install'
import {
  isSafeDirectory,
  isValidPackageName,
  createAppDir,
  getProjectInfo
} from '../utils'

const { red, green } = chalk

async function create(name: string): Promise<void> {
  if (!isValidPackageName(name)) process.exit(1)

  createAppDir(name)

  if (!isSafeDirectory(name)) process.exit(1)

  const root = path.resolve(name)
  const { template, ...projectInfo } = await getProjectInfo(name)

  console.log()
  console.log()

  const spinner = ora('Downloading please wait...')

  spinner.start()

  try {
    await download(`${template.path}#${template.version}`, `./${name}`)
  } catch (error) {
    console.log()
    console.log(
      red(`Failed to download template ${template}: ${error.message}.`)
    )
    process.exit(1)
  }

  generate(name, projectInfo)

  spinner.succeed(`${green('Template download successfully!')}`)

  spinner.start('Installing packages. This might take a couple of minutes.')

  await install(name)

  spinner.succeed(`${green('All packages installed successfully!')}`)

  console.log()
  console.log(green(`Success! Created ${name} at ${root}`))
  console.log()
}

export default create
