<template>
  <div
    id="gridVideo"
    class="flex justify-start"
  >
    <resizable-block
      v-for="item in value"
      :key="item.id"
      :value="item"
      :data-id="item.id"
    >
      <template #content>
        <iframe
          :src="`https://player.twitch.tv/?channel=${item.username}&parent=localhost`"
          :width="item.width"
          :height="item.height"
        />
      </template>
      <template
        v-if="showHUD"
        #right
      >
        <div class="absolute-right flex flex-center">
          <q-icon
            name="chevron_right"
            color="purple"
            size="50px"
          />
        </div>
      </template>
      <template
        v-if="showHUD"
        #top
      >
        <div
          class="absolute-top-right cursor-pointer"
          style="top: 5px; right: 10px; z-index: 2;"
        >
          <q-icon
            name="close"
            color="purple"
            size="50px"
            @click="removeItem(item)"
          />
        </div>
      </template>
      <template
        v-if="showHUD"
        #bottom
      >
        <div class="absolute-bottom flex flex-center">
          <q-icon
            name="expand_more"
            color="purple"
            size="50px"
          />
        </div>
      </template>
    </resizable-block>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import stubObjectModelMixin from 'src/mixins/stubObjectModelMixin'
import ResizableBlock from 'components/Core/ResizableBlock.vue'
import interact from 'interactjs'

export default defineComponent({
  name: 'GridVideo',

  components: { ResizableBlock },

  mixins: [
    stubObjectModelMixin
  ],

  setup (props, { attrs }) {
    const { 'show-hud': showHUD } = toRefs(attrs)

    return {
      showHUD
    }
  },

  mounted () {
    for (const children of document.getElementById('gridVideo').children) {
      interact(children)
        .resizable({
          edges: {
            top: false,
            left: false,
            bottom: true,
            right: true
          },
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'gridVideo'
            })
          ],
          listeners: {
            move: this.onVideoMove
          }
        })
    }
  },

  methods: {
    onVideoMove (event) {
      const { id } = event.target.dataset
      this.updateVideoSize(parseInt(id), event.rect)
    },

    updateVideoSize (id, { width, height }) {
      const find = this.value.find(i => i.id === id)

      if (find === undefined) {
        return
      }

      find.width = width
      find.height = height
    },

    removeItem (item) {
      const index = this.value.findIndex(i => i === item)
      if (index !== -1) {
        this.value.splice(index, 1)
      }
    }
  }
})
</script>

<style scoped>

</style>
