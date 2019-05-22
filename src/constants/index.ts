export const NPM_REGISTER_URL = 'https://registry.npmjs.org/'
export const YARN_REGISTER_URL = 'https://registry.yarnpkg.com/'

interface TemplateType {
  path: string
  version: string
}

export interface TemplateInterface {
  package: TemplateType
  react: TemplateType
  vue: TemplateType
  [key: string]: any
}

export const TEMPLATE: TemplateInterface = {
  package: {
    path: 'chersquwn/easyapp-template-package',
    version: 'master'
  },
  react: {
    path: 'chersquwn/easyapp-template-react',
    version: 'master'
  },
  vue: {
    path: 'chersquwn/easyapp-template-vue',
    version: 'master'
  }
}
