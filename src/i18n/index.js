import enUS from './en-US'
import frFR from './fr-FR'

const localeKeyEnUS = 'en-US'
const localeKeyFrFR = 'fr-FR'

export const localeOptions = [
  {
    value: localeKeyEnUS,
    label: 'English'
  },
  {
    value: localeKeyFrFR,
    label: 'French'
  }
]

export const localesByKeys = () => _.keyBy(localeOptions, 'value')

export default {
  [localeKeyEnUS]: enUS,
  [localeKeyFrFR]: frFR
}
