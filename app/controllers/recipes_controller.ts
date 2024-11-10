import Recipe from '#models/recipe'
import { HttpContext } from '@adonisjs/core/http';

const apiKey = 'e3de9d1c35ed4c3f91bc95f00bfcb0f1';

export default class RecipesController{

    async index() {

      const recipes = await Recipe.all()

      return recipes

    }

    async show({ params }: HttpContext) {

      const recipe = await Recipe.find(params.id)
      return recipe
    }

    async store({params, response}: HttpContext) {

      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${params.query}&apiKey=${apiKey}`)
      const recipes = await data.json() as { results: { id: number; title: string; image: string; imageType: string }[] } // *Assertion* de tipo direto


      if (recipes.results && recipes.results.length > 0) {
        const firstRecipe = recipes.results[0]
        const recipe = await Recipe.create({
          recipeId: firstRecipe.id,
          title: firstRecipe.title,
          image: firstRecipe.image,
          imageType: firstRecipe.imageType,
        })
  
        return recipe 
      } else {
        return response.notFound({ message: 'Nenhuma receita encontrada com esse termo.' })
      }
    }

    
}