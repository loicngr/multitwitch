import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore({
  id: 'main',

  state: () => ({
    videoUsers: useStorage('videoUsers', [])
  }),

  getters: {
    getAllVideoUsers: (state) => state.videoUsers,

    videoUsersEmpty: (state) => _.isEmpty(state.videoUsers)
  },

  actions: {
    addVideoUser (username) {
      this.videoUsers.unshift({
        username
      })
    },

    removeVideoUser (index) {
      this.videoUsers.splice(index, 1)
    }
  }
})
