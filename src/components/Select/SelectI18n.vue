<template>
  <q-select
    v-model="locale"
    :options="localeOptions"
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
      I18N_LANGUAGE
    }
  }
})
</script>

<style scoped>

</style>
