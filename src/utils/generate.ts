import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import os from 'os'

const { red } = chalk

interface PackageInfo {
  [key: string]: any
}

export default function generate(name: string, packageInfo: PackageInfo): void {
  const packageFile = path.resolve(name, 'package.json')
  const readmeFile = path.resolve(name, 'README.md')

  try {
    const data = fs.readFileSync(packageFile, 'utf-8')
    const pkg = JSON.parse(data)

    pkg.name = packageInfo.name
    pkg.version = packageInfo.version
    pkg.description = packageInfo.description
    pkg.author = packageInfo.author
    pkg.license = packageInfo.license
    pkg.repository = { type: 'git', url: packageInfo.repository }
    pkg.bugs = { url: `${packageInfo.repository}/issues` }
    pkg.homepage = `${packageInfo.repository}#readme`

    if (pkg.module) pkg.module = `dist/${packageInfo.name}.mjs`
    if (pkg['umd:main']) pkg['umd:main'] = `dist/${packageInfo.name}.js`
    if (pkg.main) pkg.main = `dist/${packageInfo.name}.js`

    fs.writeFileSync(packageFile, JSON.stringify(pkg, null, 2), 'utf-8')
    fs.writeFileSync(
      readmeFile,
      `# ${packageInfo.name}${os.EOL}${packageInfo.description}`,
      'utf-8'
    )
  } catch (error) {
    console.log(red(`Fail to generate: ${error.message}`))
    process.exit(1)
  }
}
