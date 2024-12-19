import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Recipes from '#models/recipe'

export default class RecipesSeeder extends BaseSeeder {
  public async run() {
    await Recipes.createMany([
      {
        title: 'Macarrão Carbonara',
        description: 'Um prato italiano clássico com bacon, ovos e queijo.',
        instructions: '1. Cozinhe o macarrão. 2. Frite o bacon até ficar crocante. 3. Misture ovos e queijo em uma tigela separada. 4. Combine o macarrão com o bacon e a mistura de ovos. 5. Sirva quente.',
        cuisine: 'Italiana',
        image: 'https://example.com/images/carbonara.jpg',
      },
      {
        title: 'Tacos Mexicanos',
        description: 'Deliciosos tacos recheados com carne, queijo e vegetais.',
        instructions: '1. Cozinhe a carne com temperos mexicanos. 2. Aqueça as tortilhas. 3. Adicione a carne, queijo e vegetais nas tortilhas. 4. Sirva com limão e molho.',
        cuisine: 'Mexicana',
        image: 'https://example.com/images/tacos.jpg',
      },
      {
        title: 'Sushi de Salmão',
        description: 'Tradicional sushi japonês com arroz e salmão fresco.',
        instructions: '1. Prepare o arroz para sushi com vinagre de arroz. 2. Corte o salmão em fatias. 3. Monte o sushi com nori, arroz e salmão. 4. Sirva com molho de soja e gengibre.',
        cuisine: 'Japonesa',
        image: 'https://example.com/images/sushi.jpg',
      },
      {
        title: 'Churrasco Brasileiro',
        description: 'Carne assada na brasa com temperos simples.',
        instructions: '1. Tempere as carnes com sal grosso. 2. Asse na churrasqueira até o ponto desejado. 3. Sirva com farofa, vinagrete e pão de alho.',
        cuisine: 'Brasileira',
        image: 'https://example.com/images/churrasco.jpg',
      },
      {
        title: 'Crepe Francês',
        description: 'Crepe leve e delicioso, perfeito para sobremesa.',
        instructions: '1. Prepare a massa com farinha, ovos, leite e manteiga. 2. Cozinhe em uma frigideira antiaderente. 3. Recheie com frutas, chocolate ou doce de leite. 4. Dobre e sirva.',
        cuisine: 'Francesa',
        image: 'https://example.com/images/crepe.jpg',
      },
    ]);
  }
}
