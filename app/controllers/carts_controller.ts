import Ingredient from "#models/ingredient";
import Recipe from "#models/recipe";
import { HttpContext } from "@adonisjs/core/http"
import db from "@adonisjs/lucid/services/db";

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

  public async destroy({ response }: HttpContext) {
    return response
      .cookie('cart', JSON.stringify([]))
      .redirect().toRoute('cart.index')
  }

  public async payment({request,response}: HttpContext) {
    const cart = JSON.parse(request.cookie('cart', JSON.stringify([]))) as Array<{ id: number; quantity: number }> 

    const recipes = await Recipe.query()
    .whereIn(
      'id',
      cart.map((item) => item.id)
    )
    .preload('ingredients', (ingredientQuery) => {
      ingredientQuery.select('id', 'name' ,'stock').pivotColumns(['quantity']);
    })
    .exec()
    
    
    await db.transaction(async (trx) => {     
      for(const recipe in recipes){

        const cartItem = cart.findIndex((item: { id: number; })=>item.id == recipes[recipe].id)
        for(const ingredient of recipes[recipe].ingredients){

          if(ingredient.stock < ingredient.$extras.pivot_quantity * cart[cartItem].quantity ){

          throw new Error(ingredient.name + 'está esgotado no estoque')
        }

          ingredient.stock -= ingredient.$extras.pivot_quantity * cart[cartItem].quantity
        
          await Ingredient.query({ client: trx }).where('id', ingredient.id).update({ stock: ingredient.stock})
        }
      }

    })
    
    return response
    .cookie('cart', JSON.stringify([]))
    .redirect().toRoute('recipes.index')
  }
}




