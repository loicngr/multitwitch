<template>
  <q-form
    class="row justify-center q-gutter-sm"
    autofocus
    @submit.prevent="onSubmit"
  >
    <div class="row col-12">
      <q-input
        ref="username"
        v-model.trim="value.username"
        :readonly="readonly"
        class="col-8"
        :label="$t(I18N_USERNAME)"
        outlined
        required
        type="text"
      />
      <q-btn
        class="col-3 offset-1"
        color="primary"
        :label="$t(I18N_SUBMIT)"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue'
import formMixin from 'src/mixins/formMixin.js'
import propsReadonly from 'src/mixins/propsReadonly.js'
import { I18N_SUBMIT, I18N_USERNAME } from 'src/i18n/keys.js'

export default defineComponent({
  name: 'FormVideoUsers',

  mixins: [
    propsReadonly,
    formMixin
  ],

  emits: ['submit'],

  setup () {
    return {
      I18N_USERNAME,
      I18N_SUBMIT
    }
  },

  methods: {
    onSubmit () {
      this.$emit('submit', this.value)
      this.$refs.username.focus()
    }
  }
})
</script>

<style scoped>

</style>
