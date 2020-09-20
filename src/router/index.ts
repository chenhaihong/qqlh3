import { createRouter, createWebHistory, } from 'vue-router'

import routes from './routes'
import createBeforeEach from './createBeforeEach'
import createAfterEach from './createAfterEach'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(createBeforeEach(router))
router.afterEach(createAfterEach(router))


export default router
