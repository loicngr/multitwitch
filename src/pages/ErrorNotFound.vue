<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { extractTokenFromUrl } from 'src/utils/api/twitch'
import { useMainStore } from 'stores/store'

export default defineComponent({
  name: 'ErrorNotFound',

  setup () {
    const { TWITCH_APP_REDIRECT_URL } = process.env

    const windowHref = window.location.href

    if (TWITCH_APP_REDIRECT_URL && windowHref.startsWith(TWITCH_APP_REDIRECT_URL)) {
      const accessToken = extractTokenFromUrl(windowHref)

      if (!accessToken || _.isEmpty(accessToken)) {
        return
      }

      const mainStore = useMainStore()
      mainStore.updateTwitchAccessToken(accessToken)
      window.location.href = window.location.origin
    }

    return {}
  }
})
</script>
