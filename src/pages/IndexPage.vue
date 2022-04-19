<template>
  <q-page
    class="row flex-center"
  >
    <div
      :style="{maxWidth: '500px'}"
      class="col-xs-10 col-sm-6 text-center"
    >
      <form-video-users
        :value="videoForm"
        @submit="addVideoUser"
      />
      <q-btn
        v-if="!isVideoUsersEmpty"
        class="q-my-md full-width"
        color="primary"
        label="GO"
        @click="goVideoPage"
      />
      <list-video-users
        :value="videoUsers"
        class="text-left"
        @remove="removeVideoUser"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import FormVideoUsers from 'components/Form/FormVideoUsers.vue'
import ListVideoUsers from 'components/List/ListVideoUsers.vue'
import { I18N_USER_ADDED, I18N_USER_REMOVED } from 'src/i18n/keys.js'
import { useMainStore } from 'stores/store.js'
import { useI18n } from 'vue-i18n'
import { loadingHandler, toast } from 'src/utils/index.js'

export default defineComponent({
  name: 'IndexPage',

  components: {
    ListVideoUsers,
    FormVideoUsers
  },

  setup () {
    const { t } = useI18n({ useScope: 'global' })
    const mainStore = useMainStore()

    const videoForm = ref({
      username: ''
    })

    const videoUsers = computed(() => mainStore.getAllVideoUsers)

    const addVideoUser = () => {
      const { username } = videoForm.value

      if (!username || _.isEmpty(username)) {
        return
      }

      mainStore.addVideoUser(username)

      toast.positive(t(I18N_USER_ADDED))

      videoForm.value.username = ''
    }

    const removeVideoUser = (item) => {
      const _find = videoUsers.value.findIndex(u => u === item)
      if (_find !== -1) {
        mainStore.removeVideoUser(_find)

        toast.positive(t(I18N_USER_REMOVED))
      }
    }

    return {
      videoForm,
      addVideoUser,
      removeVideoUser,
      videoUsers,
      isVideoUsersEmpty: computed(() => mainStore.videoUsersEmpty)
    }
  },

  methods: {
    goVideoPage () {
      loadingHandler(async () => {
        await this.$router.push('/video')
      })
    }
  }
})
</script>
