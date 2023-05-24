import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// firebase auth
import { getAuth, onAuthStateChanged } from 'firebase/auth' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {requireAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/navguard',
      name: 'navguard',
      component: () => import('../views/NavGuard.vue'),
      meta: {requireAuth: true}
    }
  ]
})

// makes so, the user can refresh the page when logged in
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), 
      user => {
        removeListener()
        resolve(user)
      }, 
      reject
    )
  })
}

router.beforeEach(async(to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (await getCurrentUser()) {

// before getCurrentUser   if (getAuth().currentUser) {
      next()
    } else {
      next({name: '/login'})
    }
  } else {
    next()
  }
})

export default router
