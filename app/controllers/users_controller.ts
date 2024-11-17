import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  index(){

  }
  
  create({ view }: HttpContext) {
    return view.render('pages/criarConta')
  }

  async store({request, response }: HttpContext) {
    const payload = await request.all()
    const data = await createUserValidator.validate(payload)

    const user = new User()
    user.merge(data)

    await user.save()

    return response.redirect().toRoute('auth.create')
  }

  async patch({request, response }: HttpContext) {

    const payload = await request.all()
    const data = await createUserValidator.validate(payload)

    await User.query()
    .where('name', data.fullName)
    .update({
      name: data.fullName,
      email: data.email,
      password: data.password,
    })
  
  return response.status(200).json({ message: 'Usuário atualizado com sucesso' })
  }
}