import ApiKey from '#models/api_key'
import type { HttpContext } from '@adonisjs/core/http'
import crypto from 'crypto'

export default class ApiKeysController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const keys = await ApiKey.all()
    return response.status(200).json(keys)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {

    const name: string = request.input('name')
    const description: string = request.input('description')

    if (!name) {
      return response.badRequest('Name is required')
    }

    const key = crypto.randomBytes(32).toString('hex')
    const apiKey = await ApiKey.create({
      name,
      description,
      key,
      active: true,
    })
    return response.created(apiKey)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const apiKey = await ApiKey.findOrFail(params.id)
    return response.status(200).json(apiKey)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const apiKey = await ApiKey.findOrFail(params.id)
    apiKey.active = request.input('active')
    apiKey.description = request.input('description')
    await apiKey.save()
    return response.status(200).json(apiKey)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const apiKey = await ApiKey.findOrFail(params.id)
    await apiKey.delete()
    return response.noContent()
  }
}