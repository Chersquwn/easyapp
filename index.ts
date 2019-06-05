import program from 'commander'
import { version } from './package.json'
import create from './src/commands/create'
import list from './src/commands/list'
import { checkNodeVersion } from './src/utils/check-version'

checkNodeVersion()

program
  .version(version, '-v, --version')
  .command('create [name]')
  .description('create project')
  .action(async (name: string) => {
    await create(name)
  })
  .command('list')
  .description('list templates')
  .action(async () => {
    await list()
  })

program.parse(process.argv)

if (program.args.length < 1) {
  program.help()
}
