<template>
  <div
    class="row justify-center q-gutter-sm q-pb-xl"
  >
    <q-list
      v-if="value.length > 0"
      bordered
      class="row col-12 scroll"
      :style="{maxHeight: '300px'}"
    >
      <q-item
        v-for="(item, index) in value"
        :key="index"
        v-ripple
        clickable
        class="col-12"
      >
        <q-item-section>
          {{ item.username }}
        </q-item-section>
        <q-item-section avatar>
          <q-btn
            color="primary"
            icon="close"
            @click="$emit('remove', item)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import stubArrayModelMixin from 'src/mixins/stubArrayModelMixin.js'

export default defineComponent({
  name: 'ListVideoUsers',

  mixins: [
    stubArrayModelMixin
  ],

  emits: [
    'remove'
  ],

  setup () {
    return {
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },

      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: '0.75'
      }
    }
  }
})
</script>

<style scoped>

</style>
