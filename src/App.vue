<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { localesByKeys } from 'src/i18n/index.js'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',

  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const $q = useQuasar()
    const locales = localesByKeys()

    const userLocal = $q.lang.getLocale()
    if (userLocal && locales[userLocal] && $q.lang.isoName !== userLocal) {
      locale.value = userLocal
    }
  }
})
</script>
