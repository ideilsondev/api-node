import TenantUser from '#models/tenant_user'
import type { HttpContext } from '@adonisjs/core/http'



export default class TenantUsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const tenantUsers = await TenantUser.all()
      return response.accepted(tenantUsers)
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
      const tenantUser = await TenantUser.create(body)
      return response.created(tenantUser)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const tenantUser = await TenantUser.findOrFail(params.id)
      return response.status(200).json(tenantUser)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const tenantUser = await TenantUser.findOrFail(params.id)
      const body = request.body()
      tenantUser.merge(body)
      await tenantUser.save()
      return response.status(200).json(tenantUser)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const tenantUser = await TenantUser.findOrFail(params.id)
      tenantUser.delete()
      return response.status(204).json({ message: 'TenantUser deleted successfully' })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async get_by_tenant({ params, response }: HttpContext) {
    try {
      const tenantUsers = await TenantUser.query().where('tenant_id', params.id)
      return response.status(200).json(tenantUsers)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }


}