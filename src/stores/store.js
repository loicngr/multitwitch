import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { api } from 'boot/axios'
import { STORE_CONFIG } from 'src/consts'

export const useMainStore = defineStore({
  id: 'main',

  state: () => ({
    config: useStorage('config', { ...STORE_CONFIG }),
    twitchAccessToken: useStorage('twitchAccessToken', null),
    twitchCurrentUser: useStorage('twitchCurrentUser', {}),
    videoUsers: useStorage('videoUsers', [])
  }),

  getters: {
    /**
     * Return twitch user accessToken
     * @return {string|null}
     */
    getTwitchAccessToken: (state) => state.twitchAccessToken,

    /**
     * Return twitch logged current user
     * @return {object}
     */
    getTwitchCurrentUser: (state) => state.twitchCurrentUser,

    /**
     * Return true if user are logged with twitch
     * @return {boolean}
     */
    isTwitchUserLogged: (state) => state.twitchAccessToken && state.twitchCurrentUser && state.twitchCurrentUser.id,

    /**
     * Return all videoUsers
     * @return {object[]}
     */
    getAllVideoUsers: (state) => state.videoUsers,

    /**
     * Return true if videoUsers are empty
     * @return {boolean}
     */
    videoUsersEmpty: (state) => _.isEmpty(state.videoUsers),

    /**
     * Return store global config
     * @return {object}
     */
    getConfig: (state) => state.config
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
    },

    updateConfig (oConfig) {
      const mainStore = useMainStore()

      this.config = {
        ...mainStore.getConfig,
        ...oConfig
      }
    }
  }
})
