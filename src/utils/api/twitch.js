import { Platform } from 'quasar'

export const getTwitchOauthUrl = () => {
  const {
    TWITCH_APP_SCOPES,
    TWITCH_APP_REDIRECT_URL,
    TWITCH_APP_CLIENT_ID
  } = process.env

  if (!TWITCH_APP_CLIENT_ID || _.isEmpty(TWITCH_APP_CLIENT_ID)) {
    console.error('Twitch app client id not find')
    return false
  }

  let authURL = 'https://id.twitch.tv/oauth2/authorize'
  authURL += `?client_id=${TWITCH_APP_CLIENT_ID}`
  authURL += `&response_type=token`
  authURL += `&redirect_uri=${TWITCH_APP_REDIRECT_URL}`
  authURL += `&scope=${encodeURIComponent(TWITCH_APP_SCOPES.split(',').join(' '))}`

  return authURL
}

export function extractTokenFromUrl (url) {
  const rawAccessToken = url.substring(url.indexOf('access_token=') + 13)
  return rawAccessToken.substring(0, rawAccessToken.indexOf('&'))
}

export const openTwitchOauth = (opt = { popup: false }) => {
  const url = getTwitchOauthUrl()
  if (!url) {
    return false
  }

  if (Platform.is.mobile || !opt.popup) {
    window.open(url)
    return
  }

  window.open(
    url,
    null,
    `
    scrollbars=no,
    resizable=no,
    status=no,
    location=no,
    toolbar=no,
    menubar=no,
    width=300,
    height=600,
    left=0,
    top=0
    `)
}
