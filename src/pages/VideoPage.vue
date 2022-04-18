<template>
  <q-page class="bg-accent">
    <grid-video
      :value="items"
      v-bind="$attrs"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import GridVideo from 'components/Video/GridVideo.vue'

export default defineComponent({
  name: 'VideoPage',

  components: { GridVideo },

  setup () {
    const items = ref([
      {
        username: 'zaekof',
        id: 112233,
        width: 300,
        height: 150
      },
      {
        username: 'paranoi4k',
        id: 112234,
        width: 300,
        height: 150
      },
      {
        username: 'mastersnakou',
        id: 112235,
        width: 300,
        height: 150
      }
    ])

    return {
      items
    }
  }
})
</script>
