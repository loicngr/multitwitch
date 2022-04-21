import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { api } from 'boot/axios'

export const useMainStore = defineStore({
  id: 'main',

  state: () => ({
    twitchAccessToken: useStorage('twitchAccessToken', null),
    twitchCurrentUser: useStorage('twitchCurrentUser', {}),
    videoUsers: useStorage('videoUsers', [])
  }),

  getters: {
    getTwitchAccessToken: (state) => state.twitchAccessToken,

    getTwitchCurrentUser: (state) => state.twitchCurrentUser,

    isTwitchUserLogged: (state) => state.twitchAccessToken && state.twitchCurrentUser && state.twitchCurrentUser.id,

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
    },

    updateTwitchAccessToken (accessToken) {
      this.twitchAccessToken = accessToken
    },

    updateTwitchCurrentUser (user) {
      this.twitchCurrentUser = user
    },

    apiTwitchGetCurrentUser () {
      if (!this.twitchAccessToken || _.isEmpty(this.twitchAccessToken)) {
        return false
      }

      if (!process.env.TWITCH_APP_CLIENT_ID || _.isEmpty(process.env.TWITCH_APP_CLIENT_ID)) {
        return false
      }

      return api.get('/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.twitchAccessToken}`,
          'Client-ID': process.env.TWITCH_APP_CLIENT_ID
        }
      }).then(r => {
        api.defaults.headers.common.Authorization = `Bearer ${this.twitchAccessToken}`
        this.updateTwitchCurrentUser(_.get(r, ['data', 'data', 0], null))
      })
    }
  }
})
