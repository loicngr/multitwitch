<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="chevron_left"
          @click="goBack"
        />

        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>

        <q-toolbar-title
          shrink
        >
          <q-btn
            flat
            dense
            round
            icon="pan_tool_alt"
            @click="toggleHUD"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view
        :show-hud="showHUD"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VideoLayout',

  components: {},

  setup () {
    const { name } = process.env.APP
    const showHUD = ref(true)

    return {
      appName: name,
      showHUD,
      toggleHUD () {
        showHUD.value = !showHUD.value
      }
    }
  },

  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
})
</script>
