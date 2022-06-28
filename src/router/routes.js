import SignUP from 'pages/SignUp.vue'
import PrivatePage from 'pages/PrivatePage.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        //component: () => import('pages/IndexPage.vue')
        component: () => import('pages/HomePage.vue')
      },
      {
        path: 'private',
        component: () => import('pages/PrivatePage.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/SignUp.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
