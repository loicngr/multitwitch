<template>
  <q-page class="flex flex-center column">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
      class="col-12"
    >
    <router-link
      to="/about"
      class="col-12 q-mt-lg"
    >
      about page
    </router-link>
    <router-link
      to="/video"
      class="col-12 q-mt-lg"
    >
      video page
    </router-link>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
