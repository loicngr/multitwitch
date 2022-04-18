<template>
  <q-drawer
    bordered
    show-if-above
    v-bind="$attrs"
  >
    <q-list>
      <q-item-label
        header
      >
        {{ appName }}
      </q-item-label>

      <!--      <q-item-->
      <!--        clickable-->
      <!--        href="/#/help"-->
      <!--        tag="a"-->
      <!--      >-->
      <!--        <q-item-section-->
      <!--          avatar-->
      <!--        >-->
      <!--          <q-icon name="help" />-->
      <!--        </q-item-section>-->

      <!--        <q-item-section>-->
      <!--          <q-item-label>{{ $t(i18nLinkTitleHelp) }}</q-item-label>-->
      <!--          &lt;!&ndash;          <q-item-label caption>&ndash;&gt;-->
      <!--          &lt;!&ndash;            {{ caption }}&ndash;&gt;-->
      <!--          &lt;!&ndash;          </q-item-label>&ndash;&gt;-->
      <!--        </q-item-section>-->
      <!--      </q-item>-->

      <q-item>
        <q-item-section avatar>
          <q-icon name="language" />
        </q-item-section>
        <q-item-section>
          <SelectI18n />
        </q-item-section>
      </q-item>

      <q-item class="absolute-bottom">
        <q-item-section>
          <a
            href="https://twitter.com/zaekof"
            target="_blank"
          >
            {{ $t(i18nCreatedBy) }} Zaëkof
          </a>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { I18N_CREATED_BY, I18N_HELP } from 'src/i18n/keys'
import SelectI18n from 'components/Select/SelectI18n.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMenu',

  components: { SelectI18n },

  setup () {
    const { name } = process.env.APP

    return {
      appName: name,
      i18nCreatedBy: I18N_CREATED_BY,
      i18nLinkTitleHelp: I18N_HELP
    }
  }
})
</script>

<style scoped>

</style>
