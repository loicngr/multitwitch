<template>
  <q-page
    id="videoPage"
    class="bg-accent"
  >
    <grid-video
      :value="items"
      v-bind="$attrs"
      :overflow="overflow"
      @remove="onVideoRemove"
    />

    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import GridVideo from 'components/Video/GridVideo.vue'
import { useMainStore } from 'stores/store.js'

export default defineComponent({
  name: 'VideoPage',

  components: { GridVideo },

  setup () {
    const mainStore = useMainStore()

    const items = ref([...mainStore.getAllVideoUsers])

    const generateVideosSizes = () => {
      const toolbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--core-toolbar-height')) ||
        document.getElementById('videoToolbar').clientHeight ||
        50

      const windowWidth = window.innerWidth
      const windowHeight = (window.innerHeight - toolbarHeight)
      const length = items.value.length

      const windowWidthPerTwo = Math.floor(windowWidth / 2)
      const windowHeightPerTwo = Math.floor(windowHeight / 2)

      const isPair = length % 2 === 0

      if (isPair) {
        switch (length) {
          case 2:
            items.value.forEach(i => {
              i.width = windowWidthPerTwo
              i.height = windowHeight
            })
            break
          case 4:
            items.value.forEach(i => {
              i.width = windowWidthPerTwo
              i.height = windowHeightPerTwo
            })
            break
          default:
            items.value.forEach(i => {
              i.width = windowWidthPerTwo - 10
              i.height = windowHeightPerTwo - 10
            })
            break
        }
      } else {
        switch (length) {
          case 1:
            items.value.forEach(i => {
              i.width = windowWidth
              i.height = windowHeight
            })
            break
          case 3:
            items.value.forEach((i, index) => {
              if ((index + 1) % 3 === 0) {
                i.width = windowWidth
              } else {
                i.width = windowWidthPerTwo
              }

              i.height = windowHeightPerTwo
            })
            break
          default:
            items.value.forEach((i, _index) => {
              const index = _index + 1

              if ((index % 2 !== 0) && index === length) {
                i.width = windowWidth - 20
              } else {
                i.width = windowWidthPerTwo - 10
              }

              i.height = windowHeightPerTwo
            })
            break
        }
      }
    }

    const onResize = () => {
      generateVideosSizes()
    }

    onMounted(() => {
      generateVideosSizes()
    })

    return {
      items,
      onResize,
      onVideoRemove: generateVideosSizes,
      overflow: items.value.length <= 4
    }
  }
})
</script>
