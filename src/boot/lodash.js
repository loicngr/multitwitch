import { boot } from 'quasar/wrappers'
import lodash from 'lodash'

export default boot(({ app }) => {
  app.config.globalProperties._ = lodash
  window._ = lodash
})
