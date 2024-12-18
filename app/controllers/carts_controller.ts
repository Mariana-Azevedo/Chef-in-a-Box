import Ingredient from "#models/ingredient"
import { HttpContext } from "@adonisjs/core/http"

export default class CartsController {
  public async index({ request,view }: HttpContext) {
  
    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }> 

    console.log(cart)
    const ingredients = await Ingredient.query()
    .whereIn(
      'id',
      cart.map((item) => item.id)
    )
    .exec()

    console.log(ingredients)
    console.log("vai")
    return view.render('pages/products/cart.edge', { ingredients })
  }

  public async store({ request, response }: HttpContext) {
    const { ingredients } = request.only(['ingredients']) as { ingredients: Array<{ id: number; quantity: number }> }

    if (!Array.isArray(ingredients)) {
      console.error('[STORE] Dados inválidos: ingredientes não são um array.')
      return response.status(400).json({ error: 'Os ingredientes devem ser um array' })
    }

    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }> 
    
      
    for(const ingredient of ingredients){
      const cartItem = cart.find(item=>item.id == ingredient.id)
      if(cartItem){
        cartItem.quantity+=ingredient.quantity
      }else{
        cart.push(ingredient)
      }
    }

    response.cookie('cart', JSON.stringify(cart))
  }

  public async update({ request, response }: HttpContext) {

    const { ingredients } = request.only(['ingredients']) as { ingredients: Array<{ id: number; quantity: number }> }

    if (!Array.isArray(ingredients)) {
      console.error('[STORE] Dados inválidos: ingredientes não são um array.')
      return response.status(400).json({ error: 'Os ingredientes devem ser um array' })
    }

    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }> 

    for(const ingredient of ingredients){
      const cartItem = cart.findIndex(item=>item.id == ingredient.id)

      if(ingredient.quantity == 0)
      {
        cart.splice(cartItem, 1)
      }
      if(cartItem){
        cart[cartItem].quantity=ingredient.quantity
      }
    }

    response.cookie('cart', JSON.stringify(cart))

    return response.redirect().toRoute('cart.index')
  }
}




