<template>
  <q-select
    v-model="value"
    :label="$t(I18N_THEME)"
    :options="selectDarkModeOptions"
    borderless
    dense
    emit-value
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
import { defineComponent, ref, watch } from 'vue'
import { I18N_THEME } from 'src/i18n/keys'
import { useQuasar } from 'quasar'
import { useMainStore } from 'stores/store'
import { selectDarkModeOptions } from 'src/consts'

export default defineComponent({
  name: 'SelectDarkMode',

  setup () {
    const $q = useQuasar()
    const mainStore = useMainStore()
    const value = ref($q.dark.isActive)

    watch(value, (v) => {
      $q.dark.set(v)
      mainStore.updateConfig({ darkMode: v })
    })

    return {
      value,
      selectDarkModeOptions,
      I18N_THEME
    }
  }
})
</script>

<style scoped>

</style>
