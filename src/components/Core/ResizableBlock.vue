<template>
  <div
    :style="{
      minWidth: '150px',
      minHeight: '150px',
      width: value.width + 'px',
      height: value.height + 'px',
    }"
    class="bg-blue relative-position q-mx-sm q-my-sm"
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
