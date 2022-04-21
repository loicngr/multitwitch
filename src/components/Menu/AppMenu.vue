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

      <q-item>
        <q-item-section
          v-if="!twitchUserLogged"
        >
          <q-btn
            :label="`Twitch - ${$t(I18N_LOGIN)}`"
            color="primary"
            icon="login"
            @click="onTwitchLogin"
          />
        </q-item-section>
        <template v-else>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            {{ $t(I18N_WELCOME) }} {{ twitchCurrentUser.display_name }}
          </q-item-section>
        </template>
      </q-item>

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
            {{ $t(I18N_CREATED_BY) }} Zaëkof
          </a>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { I18N_CREATED_BY, I18N_HELP, I18N_LOGIN, I18N_WELCOME } from 'src/i18n/keys.js'
import SelectI18n from 'components/Select/SelectI18n.vue'
import { computed, defineComponent } from 'vue'
import { openTwitchOauth } from 'src/utils/api/twitch'
import { useMainStore } from 'stores/store'

export default defineComponent({
  name: 'AppMenu',

  components: { SelectI18n },

  setup () {
    const mainStore = useMainStore()
    mainStore.apiTwitchGetCurrentUser()

    const twitchCurrentUser = computed(() => mainStore.getTwitchCurrentUser)
    const twitchUserLogged = computed(() => mainStore.isTwitchUserLogged)

    return {
      appName: process.env.APP.name,
      twitchUserLogged,
      twitchCurrentUser,
      I18N_WELCOME,
      I18N_LOGIN,
      I18N_CREATED_BY,
      I18N_HELP
    }
  },

  methods: {
    onTwitchLogin () {
      openTwitchOauth()
    }
  }
})
</script>

<style scoped>

</style>
