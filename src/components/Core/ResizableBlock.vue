<template>
  <div
    :style="{
      minWidth: '50px',
      minHeight: '50px',
      width: value.width + 'px',
      height: value.height + 'px',
    }"
    class="relative-position"
  >
    <slot name="content" />
    <slot name="top" />
    <slot name="right" />
    <slot name="left" />
    <slot name="bottom" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import stubObjectModelMixin from 'src/mixins/stubObjectModelMixin'

export default defineComponent({
  name: 'ResizableBlock',

  mixins: [
    stubObjectModelMixin
  ]
})
</script>
