import { createMemoryHistory, createRouter } from 'vue-router'

import CardView from '../CardView.vue'
import App from '../App.vue'

const routes = [
  { path: 
    '/', 
    props: true,
    component: App 
  },
  { path: 
    '/products/:id', 
    name: 'CardView',
    props: true,
    component: CardView 
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router

