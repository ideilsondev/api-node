import Tenant from '#models/tenant'
import CodeGenerator from '#services/helps'
import type { HttpContext } from '@adonisjs/core/http'


export default class TenantsController {
  /**
   * Display a list of resource
   */

  async index({ response }: HttpContext) {
    try {
      const tenants = await Tenant.all()
      return response.accepted(tenants)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const body = request.body()
      const code: number = CodeGenerator.genCode()

      if (!body.name) {
        return response.badRequest('Name is required')
      }

      if (!body.code) {
        body.code = code
      }
      const tenant = await Tenant.create({
        code: parseInt(body.code, 10),
        name: body.name,
        description: body.description,
        active: true,
      })
      return response.created(tenant)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const tenant = await Tenant.findOrFail(params.id)
      return response.status(200).json(tenant)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const body = request.body()
      const tenant = await Tenant.findOrFail(params.id)

      tenant.merge(body)
      await tenant.save()

      return response.status(200).json(tenant)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const tenant = await Tenant.findOrFail(params.id)
      await tenant.delete()
      return { message: 'Tenant deleted successfully' }
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}