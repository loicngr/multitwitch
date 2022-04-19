import stubObjectModelMixin from './stubObjectModelMixin.js'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [
    stubObjectModelMixin
  ],

  props: {
    submit: {
      type: Boolean
    }
  },

  emits: ['submit'],

  methods: {
    onSubmit () {
      this.$emit('submit', this.value)
    }
  }
})
