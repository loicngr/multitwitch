import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: _.stubObject
    }
  }
})
