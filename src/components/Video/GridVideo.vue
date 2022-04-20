<template>
  <div
    id="gridVideo"
    class="flex justify-start"
    :class="overflow ? 'overflow-hidden' : ''"
    :style="{
      height: 'auto'
    }"
  >
    <resizable-block
      v-for="(item, index) in value"
      :key="index"
      :value="item"
      :data-username="item.username"
    >
      <template #content>
        <!--        <div-->
        <!--          :style="{-->
        <!--            display: 'block',-->
        <!--            width: item.width,-->
        <!--            height: item.height-->
        <!--          }"-->
        <!--        />-->
        <iframe
          :src="`https://player.twitch.tv/?channel=${item.username}&parent=${appUrl}`"
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

  props: {
    overflow: {
      type: Boolean,
      default: false
    }
  },

  emits: ['remove'],

  setup (props, { attrs }) {
    const { 'show-hud': showHUD } = toRefs(attrs)

    return {
      showHUD,
      appUrl: window.location.hostname,
      valueCount: props.value.length
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
            move: (e) => {
              this.onVideoMove(e)
            }
          }
        })
    }
  },

  methods: {
    onVideoMove (event) {
      const { username } = event.target.dataset
      this.updateVideoSize(username, event.rect)
    },

    updateVideoSize (username, { width, height }) {
      const find = this.value.find((i) => i.username === username)

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
        this.$emit('remove')
      }
    }
  }
})
</script>

<style scoped>

</style>
