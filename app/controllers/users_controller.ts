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

  public async patch({ request, response, params, view }: HttpContext) {
    const userId = params.id;

    try {
      // Busca o usuário ou lança erro se não encontrado
      const user = await User.findOrFail(userId);

      // Atualiza os dados diretamente usando `merge`
      const payload = request.all();
      const updatedData = await createUserValidator.validate(payload)
      user.merge(updatedData);

      console.log(updatedData.fullName)

      // Salva as alterações
      await user.save();

      return response.redirect().toRoute('users.profile', {id: user.id})

    } catch (error) {
      console.error(error);
      return response.status(500).json({
        error: 'Erro ao atualizar o usuário.',
        details: error.message,
      });
    }
  }

  public async profile({ view, params }: HttpContext) {
    console.log(params.id)
    const userId = params.id;
    const user = await User.findByOrFail('id',userId)

    const returnUser ={
      fullName: user.fullName,
      email: user.email,
      id: user.id,
    } 
    
    return view.render('pages/user/profile', { returnUser })
  }
}

