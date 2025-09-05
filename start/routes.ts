/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ApiKeysController from '#controllers/api_keys_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {

  router.group(() => {
    router.resource('api-key', ApiKeysController).apiOnly()
  }).prefix('system')

}).prefix('api/v1').use(middleware.apiKey())