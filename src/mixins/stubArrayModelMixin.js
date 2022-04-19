import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Array,
      default: _.stubArray
    }
  }
})
