import { i18n } from 'boot/i18n'
import { I18N_DARK, I18N_ENGLISH, I18N_FRENCH, I18N_LIGHT } from 'src/i18n/keys'
import { localeKeyEnUS, localeKeyFrFR } from 'src/i18n'

const $t = (key) => i18n.global.t(key)

export const STORE_CONFIG = {
  lang: null,
  darkMode: false
}

export const selectLocaleOptions = [
  {
    value: localeKeyEnUS,
    label: () => $t(I18N_ENGLISH)
  },
  {
    value: localeKeyFrFR,
    label: () => $t(I18N_FRENCH)
  }
]

export const localesByKeys = () => _.keyBy(selectLocaleOptions, 'value')

const darkModeKeyDark = true
const darkModeKeyLight = false
export const selectDarkModeOptions = [
  {
    value: darkModeKeyDark,
    label: () => $t(I18N_DARK)
  },
  {
    value: darkModeKeyLight,
    label: () => $t(I18N_LIGHT)
  }
]
