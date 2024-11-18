import Ingredient from '#models/ingredient';
import Recipe from '#models/recipe'
import { createIngredientValidator } from '#validators/ingredient';
import { createRecipeValidator } from '#validators/recipe';
import { HttpContext } from '@adonisjs/core/http';

export default class RecipesController{

  public async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const payload = request.only(['title'])

    const query = Recipe.query().preload('ingredients', (ingredientQuery) => {
      ingredientQuery.select('id', 'price').pivotColumns(['quantity']) // Inclua pivotColumns(['quantity'])
    })

    if (payload.title && payload.title.length > 0) {
      query.where('title', 'like', `%${payload.title}%`)
    }

    const recipes = await query.paginate(page, limit)
    
    // Calcular o preço total de cada receita
    const recipesWithPrices = recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      instructions: recipe.instructions,
      image: recipe.image,
      totalPrice: recipe.ingredients.reduce((acc, ingredient) => acc+ingredient.price*ingredient.$extras.pivot_quantity,0)
    }))

    return view.render('pages/index', { recipes: recipesWithPrices })
  }

  
  public async show({ params, view, response }: HttpContext) {
    const recipeId = params.id;
  
    try {
      // Busca a receita pelo ID e faz o preload dos ingredientes
      const recipe = await Recipe.query()
        .where('id', recipeId)
        .preload('ingredients', (ingredientQuery) => {
          ingredientQuery.select('id', 'name', 'price').pivotColumns(['quantity']);
        })
        .first();
  
      // Verifica se a receita existe
      if (!recipe) {
        return response.status(404).send('Receita não encontrada.');
      }
  
      // Calcula o preço total da receita
      const totalPrice = recipe.ingredients.reduce(
        (total, ingredient) =>
          total + ingredient.price * ingredient.$extras.pivot_quantity,
        0
      );
  
      // Prepara os dados da receita para serem enviados à view
      const recipeDetails = {
        id: recipe.id,
        title: recipe.title,
        instructions: recipe.instructions,
        image: recipe.image,
        totalPrice,
        ingredients: recipe.ingredients.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          price: ingredient.price,
          quantity: ingredient.$extras.pivot_quantity,
        })),
      };
  
      // Renderiza a página com os detalhes da receita
      return view.render('pages/showRecipe', { recipe: recipeDetails });
    } catch (error) {
      console.error(error);
      return response.status(500).send('Erro ao buscar a receita.');
    }
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

  async create({ view }: HttpContext) {

    return view.render('pages/createRecipe')

  }
  
}


  
  
