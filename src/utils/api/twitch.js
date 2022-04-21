import { toast } from 'src/utils/index.js'

export const getTwitchOauthUrl = () => {
  if (!process.env.TWITCH_APP_CLIENT_ID || _.isEmpty(process.env.TWITCH_APP_CLIENT_ID)) {
    console.error('Twitch app client id not find', process.env.TWITCH_APP_CLIENT_ID, process.env.TWITCH_APP_REDIRECT_URL)
    return false
  }

  let authURL = 'https://id.twitch.tv/oauth2/authorize'
  authURL += `?client_id=${process.env.TWITCH_APP_CLIENT_ID}`
  authURL += `&response_type=token`
  authURL += `&redirect_uri=${process.env.TWITCH_APP_REDIRECT_URL}`
  authURL += `&scope=${encodeURIComponent(process.env.TWITCH_APP_SCOPES.split(',').join(' '))}`

  return authURL
}

export function extractTokenFromUrl (url) {
  const rawAccessToken = url.substring(url.indexOf('access_token=') + 13)
  return rawAccessToken.substring(0, rawAccessToken.indexOf('&'))
}

export const openTwitchOauth = () => {
  const url = getTwitchOauthUrl()
  if (!url) {
    toast.negative('URL not valid')
    return false
  }

  window.open(url)
}
