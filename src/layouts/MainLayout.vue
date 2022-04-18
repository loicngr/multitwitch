<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <app-menu
      v-model="leftDrawerOpen"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AppMenu from 'components/Menu/AppMenu.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppMenu
  },

  setup () {
    const { name } = process.env.APP
    const leftDrawerOpen = ref(false)

    return {
      appName: name,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
