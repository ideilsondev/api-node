import ApiKey from '#models/api_key'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiKeyMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const apiKey = ctx.request.header('x-api-key')

    const envKeys = (process.env.API_KEY || '').split(',')
    const dbKeys = apiKey ? await ApiKey.query().where('key', apiKey).where('active', true).first() : null

    if (!apiKey || (!envKeys.includes(apiKey) && !dbKeys)) {
      return ctx.response.unauthorized('Invalid API key')
    }

    await next()
  }
}