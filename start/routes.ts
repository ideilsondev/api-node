import ApiKeysController from '#controllers/api_keys_controller'
import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
import TenantsController from '#controllers/tenants_controller'
import TenantUsersController from '#controllers/tenant_users_controller'


router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {

  router.group(() => {
    router.resource('api-key', ApiKeysController).apiOnly()
    router.resource('tenants', TenantsController).apiOnly()
    router.resource('tenant-users', TenantUsersController).apiOnly()
    router.get('tenant/:id', 'TenantUsersController.get_by_tenant')

  }).prefix('system')

}).prefix('api/v1')
// .middleware(middleware.apiKey())

