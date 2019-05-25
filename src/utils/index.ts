import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import validate from 'validate-npm-package-name'
import { execSync } from 'child_process'
import inquirer from 'inquirer'
import { TEMPLATE } from '../constants'

const { red, green } = chalk

export function isSafeDirectory(projectName: string): boolean {
  const projectPath = path.resolve(projectName)

  const validFiles = ['package.json', '.git']

  const conflicts = fs
    .readdirSync(projectPath)
    .filter((file): boolean => !validFiles.includes(file))

  if (conflicts.length > 0) {
    console.log(
      `The directory ${green(name)} contains files that could conflict:`
    )
    console.log()
    for (const file of conflicts) {
      console.log(`  ${red(file)}`)
    }
    console.log()

    return false
  }

  return true
}

export function isValidPackageName(name: string): boolean {
  const { validForNewPackages } = validate(name)

  if (!validForNewPackages) {
    console.error(
      `Could not create a project called ${red(
        `"${name}"`
      )} because of npm naming restrictions:`
    )

    return false
  }

  return true
}

export function createAppDir(name: string): void {
  const root = path.resolve(name)

  fs.ensureDirSync(root)
}

export function getPackageManager(): 'yarn' | 'npm' {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return 'yarn'
  } catch (e) {
    return 'npm'
  }
}

export function getGitAuthor(): { name: string; email: string } {
  let name = ''
  let email = ''

  try {
    name = execSync('git config --get user.name')
      .toString()
      .trim()
    email = execSync('git config --get user.email')
      .toString()
      .trim()
  } catch (e) {}

  return { name, email }
}

export async function getProjectInfo(name: string): Promise<inquirer.Answers> {
  const question = getQuestion(name)
  const answers = await inquirer.prompt(question)

  return answers
}

function getQuestion(name: string): inquirer.Questions {
  const author = getGitAuthor()
  const choices = Object.keys(TEMPLATE).map(
    (name: string): inquirer.ChoiceType => ({
      name,
      value: TEMPLATE[name]
    })
  )

  return [
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: name,
      filter(value: string): string {
        return value.trim()
      }
    },
    {
      type: 'input',
      name: 'version',
      message: 'Project version',
      default: '0.1.0',
      filter(value: string): string {
        return value.trim()
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description',
      filter(value: string): string {
        return value.trim()
      }
    },
    {
      type: 'input',
      name: 'repository',
      message: 'Repository',
      filter(value: string): string {
        return value.trim()
      }
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: `${author.name} <${author.email}>`,
      filter(value: string): string {
        return value.trim()
      }
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      default: 'MIT',
      filter(value: string): string {
        return value.trim()
      }
    },
    {
      type: 'list',
      name: 'template',
      message: 'Please select a template for the project',
      choices,
      default: choices[0]
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Is this ok?',
      default: true
    }
  ]
}
