import request from 'request-promise-native'
import chalk from 'chalk'

const { cyan } = chalk

interface ListItem {
  name: string
}

async function list(): Promise<void> {
  const { data } = await request.get(
    'https://api.github.com/users/yokiyokiyoki/repos'
  )

  const list = data.filter(async (item: ListItem) =>
    item.name.includes('easyapp-template')
  )

  console.log()
  console.log(`Easyapp has ${list.length} templates: `)
  console.log()

  list.forEach(
    (item: ListItem, index: number): void => {
      console.log(`${index}. ${cyan(item.name)}`)
    }
  )
}

export default list
