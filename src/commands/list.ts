import request from 'request-promise-native'
import chalk from 'chalk'

const { cyan } = chalk

interface ListItem {
  name: string
}

async function list(): Promise<void> {
  const data = await request.get(
    'https://api.github.com/users/Chersquwn/repos',
    {
      headers: {
        'User-Agent': 'Awesome-Octocat-App'
      },
      json: true
    }
  )

  const list = data.filter((item: ListItem) =>
    item.name.includes('easyapp-template')
  )

  console.log()
  console.log(`easyapp has ${cyan(list.length)} templates: `)
  console.log()

  list.forEach(
    (item: ListItem, index: number): void => {
      console.log(cyan(`    ${index + 1}. ${item.name}`))
    }
  )
}

export default list
