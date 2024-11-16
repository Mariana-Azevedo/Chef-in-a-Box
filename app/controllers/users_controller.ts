import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  index(){

  }
  
  async store({request }: HttpContext) {
    const payload = await request.all()
    const data = await createUserValidator.validate(payload)

    return data
  }
}