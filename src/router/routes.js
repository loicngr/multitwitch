
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      }
      // {
      //   path: 'about',
      //   component: () => import('pages/AboutPage.vue')
      // }
    ]
  },
  {
    path: '/video',
    component: () => import('layouts/VideoLayout.vue'),
    children: [
      { path: '', component: () => import('pages/VideoPage.vue') }
    ]
  },

  // {
  //   path: '/cb',
  //   component: () => import('layouts/CbLayout.vue'),
  //   children: [
  //     {
  //       path: 'twitch-oauth',
  //       component: () => import('pages/TwitchOauthPage.vue')
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
