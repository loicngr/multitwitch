import enUS from './en-US'
import frFR from './fr-FR'
import { i18n } from 'boot/i18n.js'
import { I18N_ENGLISH, I18N_FRENCH } from 'src/i18n/keys'

const localeKeyEnUS = 'en-US'
const localeKeyFrFR = 'fr-FR'
const $t = (key) => i18n.global.t(key)

export const localeOptions = [
  {
    value: localeKeyEnUS,
    label: () => $t(I18N_ENGLISH)
  },
  {
    value: localeKeyFrFR,
    label: () => $t(I18N_FRENCH)
  }
]

export const localesByKeys = () => _.keyBy(localeOptions, 'value')

export default {
  [localeKeyEnUS]: enUS,
  [localeKeyFrFR]: frFR
}
