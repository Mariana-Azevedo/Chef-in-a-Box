import User from "#models/user"
import { HttpContext } from "@adonisjs/core/http"

export default class CartsController {

    public async index({ request, view }: HttpContext) {
        const cartCookie = request.cookie('cart')
        const cart = cartCookie ? JSON.parse(cartCookie) : []

        return view.render('pages/products/cart.edge', { cart })
    }
      
    public async add({ request, response }: HttpContext) {
        const cartCookie = request.cookie('cart')
        const cart = cartCookie ? JSON.parse(cartCookie) : []
      
        const { id, title, price } = request.only(['id', 'title', 'price'])
        const existingItem = cart.find((ingredient: { id: any }) => ingredient.id === id)
      
        if (existingItem) {
          existingItem.quantity += 1
          existingItem.total = existingItem.quantity * existingItem.price
        } else {
          cart.push({ id, title, price, quantity: 1, total: price })
        }
      
        response.cookie('cart', JSON.stringify(cart)) // Atualiza o cookie
        return response.redirect().back()
    }
      
}
