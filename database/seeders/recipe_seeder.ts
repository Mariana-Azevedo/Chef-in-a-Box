import Ingredient from '#models/ingredient'
import Recipe from '#models/recipe'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class RecipeSeeder extends BaseSeeder {
  public async run() {
    // Criando ingredientes
    const ingredients = await Ingredient.createMany([
      {
        name: 'Farinha de Trigo',
        description: 'Farinha utilizada para massas e pães',
        unit: 'kg',
        price: 5.0,
        image: 'farinha.png',
      },
      {
        name: 'Ovos',
        description: 'Ovos frescos de galinha',
        unit: 'unidade',
        price: 0.5,
        image: 'ovos.png',
      },
      {
        name: 'Leite',
        description: 'Leite integral fresco',
        unit: 'litro',
        price: 4.0,
        image: 'leite.png',
      },
    ])

    // Criando receitas
    const recipes = await Recipe.createMany([
      {
        title: 'Bolo Simples',
        description: 'Um bolo simples e delicioso para o café da tarde.',
        instructions: 'Misture os ingredientes e asse em forno pré-aquecido por 40 minutos.',
        cuisine: 'Brasileira',
        image: 'bolo_simples.png',
      },
      {
        title: 'Panqueca',
        description: 'Panqueca fácil e rápida para o café da manhã.',
        instructions: 'Misture os ingredientes, frite em uma frigideira antiaderente e sirva.',
        cuisine: 'Internacional',
        image: 'panqueca.png',
      },
    ])

    // Associando ingredientes às receitas com quantidades na tabela pivô
    await recipes[0]
      .related('ingredients')
      .attach({
        [ingredients[0].id]: { quantity: 0.5 }, // 0.5 kg de farinha
        [ingredients[1].id]: { quantity: 3 },   // 3 ovos
        [ingredients[2].id]: { quantity: 0.5 }, // 0.5 litro de leite
      })

    await recipes[1]
      .related('ingredients')
      .attach({
        [ingredients[0].id]: { quantity: 0.25 }, // 0.25 kg de farinha
        [ingredients[1].id]: { quantity: 2 },    // 2 ovos
        [ingredients[2].id]: { quantity: 0.3 },  // 0.3 litro de leite
      })

    console.log('Recipes and ingredients seeded successfully!')
  }
}