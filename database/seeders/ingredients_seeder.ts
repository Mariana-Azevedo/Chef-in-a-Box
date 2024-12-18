import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Ingredient from '#models/ingredient'

export default class IngredientsSeeder extends BaseSeeder {
  public async run() {
    await Ingredient.createMany([
      // Ingredientes para Macarrão Carbonara
      {
        name: 'Macarrão',
        description: 'Macarrão tipo espaguete.',
        unit: 'kg',
        price: 6.00,
        image: 'https://example.com/images/macarrao.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Bacon',
        description: 'Bacon cortado em cubos.',
        unit: 'kg',
        price: 20.00,
        image: 'https://example.com/images/bacon.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Ovos',
        description: 'Ovos frescos.',
        unit: 'unidade',
        price: 0.50,
        image: 'https://example.com/images/ovos.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Queijo Parmesão',
        description: 'Queijo parmesão ralado.',
        unit: 'kg',
        price: 35.00,
        image: 'https://example.com/images/queijo-parmesao.jpg',
        imageType: 'image/jpeg',
      },

      // Ingredientes para Tacos Mexicanos
      {
        name: 'Carne Moída',
        description: 'Carne moída temperada.',
        unit: 'kg',
        price: 25.00,
        image: 'https://example.com/images/carne.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Tortilhas',
        description: 'Tortilhas de milho.',
        unit: 'pacote',
        price: 15.00,
        image: 'https://example.com/images/tortilhas.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Queijo',
        description: 'Queijo ralado.',
        unit: 'kg',
        price: 30.00,
        image: 'https://example.com/images/queijo.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Vegetais',
        description: 'Vegetais frescos cortados.',
        unit: 'kg',
        price: 12.00,
        image: 'https://example.com/images/vegetais.jpg',
        imageType: 'image/jpeg',
      },

      // Ingredientes para Sushi de Salmão
      {
        name: 'Arroz para Sushi',
        description: 'Arroz especial para sushi.',
        unit: 'kg',
        price: 8.00,
        image: 'https://example.com/images/arroz.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Vinagre de Arroz',
        description: 'Vinagre usado no arroz para sushi.',
        unit: 'ml',
        price: 15.00,
        image: 'https://example.com/images/vinagre.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Salmão',
        description: 'Salmão fresco em fatias.',
        unit: 'kg',
        price: 60.00,
        image: 'https://example.com/images/salmao.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Nori',
        description: 'Folhas de algas para sushi.',
        unit: 'pacote',
        price: 10.00,
        image: 'https://example.com/images/nori.jpg',
        imageType: 'image/jpeg',
      },

      // Ingredientes para Churrasco Brasileiro
      {
        name: 'Carne Bovina',
        description: 'Carne bovina para churrasco.',
        unit: 'kg',
        price: 50.00,
        image: 'https://example.com/images/carne-bovina.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Sal Grosso',
        description: 'Sal grosso para tempero.',
        unit: 'kg',
        price: 5.00,
        image: 'https://example.com/images/sal-grosso.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Farofa',
        description: 'Farofa temperada.',
        unit: 'kg',
        price: 8.00,
        image: 'https://example.com/images/farofa.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Vinagrete',
        description: 'Molho de tomate e cebola.',
        unit: 'litro',
        price: 10.00,
        image: 'https://example.com/images/vinagrete.jpg',
        imageType: 'image/jpeg',
      },

      // Ingredientes para Crepe Francês
      {
        name: 'Farinha de Trigo',
        description: 'Farinha para preparar a massa do crepe.',
        unit: 'kg',
        price: 4.00,
        image: 'https://example.com/images/farinha.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Manteiga',
        description: 'Manteiga derretida para a massa.',
        unit: 'kg',
        price: 20.00,
        image: 'https://example.com/images/manteiga.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Leite',
        description: 'Leite integral.',
        unit: 'litro',
        price: 4.50,
        image: 'https://example.com/images/leite.jpg',
        imageType: 'image/jpeg',
      },
      {
        name: 'Frutas',
        description: 'Frutas frescas para o recheio.',
        unit: 'kg',
        price: 15.00,
        image: 'https://example.com/images/frutas.jpg',
        imageType: 'image/jpeg',
      },
    ]);
  }
}
