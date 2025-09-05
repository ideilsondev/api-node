import ApiKeysController from '#controllers/api_keys_controller'
import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
import TenantsController from '#controllers/tenants_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {

  router.group(() => {
    router.resource('api-key', ApiKeysController).apiOnly()
    router.resource('tenants', TenantsController).apiOnly()

  }).prefix('system')

}).prefix('api/v1')
// .middleware(middleware.apiKey())

