<template>
  <q-select
    v-model="locale"
    :options="localeOptions"
    borderless
    dense
    emit-value
    :label="$t(i18nLanguage)"
    map-options
    options-dense
    style="min-width: 150px"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { localeOptions } from 'src/i18n'
import { I18N_LANGUAGE } from 'src/i18n/keys'

export default defineComponent({
  name: 'SelectI18n',

  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      localeOptions,
      i18nLanguage: I18N_LANGUAGE
    }
  }
})
</script>

<style scoped>

</style>
