import Ingredient from '#models/ingredient';
import Recipe from '#models/recipe'
import { createIngredientValidator } from '#validators/ingredient';
import { createRecipeValidator } from '#validators/recipe';
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

  async store({ request, response }: HttpContext) {
    
    const payload = request.only(['title', 'instructions', 'cuisine', 'image', 'imageType'])

    const data = await createRecipeValidator.validate(payload)

    const ingredients = request.input('ingredients') // Array com os ingredientes e suas quantidades
  
    try {
      // Verifica se a receita já existe pelo título
      const existingRecipe = await Recipe.findBy('title', data.title)
      if (existingRecipe) {
        return response.status(409).json({ error: 'Receita com esse título já existe' })
      }
  
      // Cria a nova receita
      const recipe = await Recipe.create(data)
    
      const ingredientData: { [key: number]: { quantity: number } } = {}
    
      for (const ingredient of ingredients) {

        const ingredientAuth = await createIngredientValidator.validate(ingredient)
        // Busca ou cria o ingrediente
        const ingredientInstance = await Ingredient.firstOrCreate(
          { name: ingredientAuth.name },
          { description: ingredientAuth.description, unit: ingredientAuth.unit, price: ingredientAuth.price }
        )
    
        // Armazena o ID e a quantidade para inserir na tabela de junção
        ingredientData[ingredientInstance.id] = { quantity: ingredientAuth.quantity }
      }
    
      // Associa os ingredientes à receita com as quantidades
      await recipe.related('ingredients').attach(ingredientData)
    
      // Carrega os ingredientes associados e retorna a receita completa
      await recipe.load('ingredients')
    
      return response.status(201).json(recipe)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Erro ao criar a receita' })
    }
  }
  
}


  
  
