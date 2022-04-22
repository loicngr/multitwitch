import { register } from 'register-service-worker'
import { Notify } from 'quasar'
import { i18n } from 'boot/i18n'
import { I18N_IGNORE, I18N_REFRESH, I18N_UPDATE_AVAILABLE } from 'src/i18n/keys'
const $t = (key) => i18n.global.t(key)

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready (/* registration */) {
    if (process.env.DEV) {
      console.log('App is being served from cache by a service worker.')
    }
  },

  registered (/* registration */) {
    if (process.env.DEV) {
      console.log('Service worker has been registered.')
    }
  },

  cached (/* registration */) {
    if (process.env.DEV) {
      console.log('Content has been cached for offline use.')
    }
  },

  updatefound (/* registration */) {
    if (process.env.DEV) {
      console.log('New content is downloading.')
    }
  },

  updated (/* registration */) {
    Notify.create({
      color: 'negative',
      icon: 'cached',
      message: $t(I18N_UPDATE_AVAILABLE),
      timeout: 0,
      multiLine: true,
      position: 'top',
      actions: [
        {
          label: $t(I18N_REFRESH),
          color: 'yellow',
          handler: () => {
            window.location.reload()
          }
        },
        {
          label: $t(I18N_IGNORE),
          color: 'white',
          handler: () => {}
        }
      ]
    })
  },

  offline () {
    if (process.env.DEV) {
      console.log('No internet connection found. App is running in offline mode.')
    }
  },

  error (err) {
    if (process.env.DEV) {
      console.error('Error during service worker registration:', err)
    }
  }
})
