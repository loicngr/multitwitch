<template>
  <q-select
    v-model="locale"
    :options="selectLocaleOptions"
    borderless
    dense
    emit-value
    :label="$t(I18N_LANGUAGE)"
    map-options
    style="min-width: 150px"
  >
    <template #selected-item="scope">
      <div class="q-my-sm">
        {{ scope.opt.label() }}
      </div>
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>
            {{ scope.opt.label() }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { I18N_LANGUAGE } from 'src/i18n/keys'
import { useMainStore } from 'stores/store'
import { selectLocaleOptions } from 'src/consts'

export default defineComponent({
  name: 'SelectI18n',

  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const mainStore = useMainStore()

    watch(locale, (v) => {
      mainStore.updateConfig({ lang: v })
    })

    return {
      locale,
      selectLocaleOptions,
      I18N_LANGUAGE
    }
  }
})
</script>

<style scoped>

</style>
