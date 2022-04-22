<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useMainStore } from 'stores/store'
import { localesByKeys } from 'src/consts'

export default defineComponent({
  name: 'App',

  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const $q = useQuasar()
    const mainStore = useMainStore()
    const locales = localesByKeys()
    const userLocal = $q.lang.getLocale()

    $q.dark.set(mainStore.getConfig.darkMode)

    if (mainStore.getConfig.lang !== null) {
      locale.value = mainStore.getConfig.lang
    } else if (userLocal && locales[userLocal] && $q.lang.isoName !== userLocal) {
      locale.value = userLocal
      mainStore.updateConfig({ lang: userLocal })
    }
  }
})
</script>
