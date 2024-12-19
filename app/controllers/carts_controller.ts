import Recipe from "#models/recipe";
import { HttpContext } from "@adonisjs/core/http"

export default class CartsController {
  public async index({ request, view }: HttpContext) {
    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }>;

    const recipes = await Recipe.query()
      .whereIn(
        'id',
        cart.map((item) => item.id)
      )
      .preload('ingredients', (ingredientQuery) => {
        ingredientQuery.select('id', 'name', 'price', 'unit', 'image').pivotColumns(['quantity']);
      });

    const recipesCart = [] as Record<string, any>[];
    let totalPrice = 0; // Use "let" para permitir modificações.

    for (const recipe of recipes) { // Use "for...of" para iterar diretamente sobre os objetos.
      const recipeTotal = recipe.ingredients.reduce(
        (total, ingredient) =>
          total + ingredient.price * ingredient.$extras.pivot_quantity,
        0
      );

      totalPrice += recipeTotal;

      recipesCart.push({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        instructions: recipe.instructions,
        cuisine: recipe.cuisine,
        image: recipe.image,
        totalPrice: recipeTotal,
        ingredients: recipe.ingredients.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          unit: ingredient.unit,
          price: ingredient.price,
          image: ingredient.image,
          quantity: ingredient.$extras.pivot_quantity,
        })),
      });
    }

    return view.render('pages/products/cart.edge', { recipesCart, totalPrice });
  }

  public async store({ request, response }: HttpContext) {
    const { recipe } = request.only(['recipe']) as { recipe: { id: number; quantity: number } }


    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }> 
      
    const cartItem = cart.find((item: { id: number; })=>item.id == recipe.id)
    if(cartItem){
      cartItem.quantity+=recipe.quantity
    }else{
      cart.push(recipe)
    }
    
    response.cookie('cart', JSON.stringify(cart))
  }

  public async update({ request, response }: HttpContext) {

    const { recipes } = request.only(['recipes']) as { recipes: Array<{ id: number; quantity: number }> }


    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }> 


    for(const recipe in recipes){
      const cartItem = cart.findIndex((item: { id: number; })=>item.id == recipes[recipe].id)

      if(recipes[recipe].quantity == 0)
      {
        cart.splice(cartItem, 1)
      }
      if(cartItem){
        cart[cartItem].quantity=recipes[recipe].quantity
      }
    }

    response.cookie('cart', JSON.stringify(cart))

    return response.redirect().toRoute('cart.index')
  }
}




