import User from "#models/user"
import { HttpContext } from "@adonisjs/core/http"

export default class CartsController {

  public async index({ params, view }: HttpContext) {
    const userId = params.id

    const user = await User.query()
      .where('id', userId)
      .preload('cart', (cartQuery) => {
      // Preload do relacionamento many-to-many dentro do carrinho
        cartQuery.preload('ingredients', (ingredientQuery) => {
        // Seleciona as colunas específicas da tabela de itens
        ingredientQuery.select('id', 'name', 'price', 'description')
          // Carrega colunas adicionais da tabela pivot
          .pivotColumns(['quantity'])
      })
    })
    .firstOrFail()
    // Obtém o carrinho do usuário
    const cart = user.cart

    // Renderiza a view com os dados do carrinho
    return view.render('pages/products/cart.edge', { cart })
  }
      
  public async store({ params, request, response }: HttpContext) {
    const userId = params.id;

    // Obter os dados da requisição (ingredient_id e quantity)
    const { ingredient_id, quantity } = request.only(['ingredient_id', 'quantity']);

    try {
      // Buscar o usuário pelo ID e carregar o relacionamento do carrinho
      const user = await User.query()
        .where('id', userId)
        .preload('cart', (cartQuery) => {
          cartQuery.preload('ingredients');
        })
        .firstOrFail();

      // Verificar se o usuário possui um carrinho
      let cart = user.cart;
      if (!cart) {
        return response.status(400).send({ message: 'O usuário não possui um carrinho.' });
      }

      // Adicionar ou atualizar o ingrediente com a quantidade no relacionamento many-to-many
      await cart.related('ingredients').attach({
        [ingredient_id]: { quantity },
      });

      return response.status(200).send({
        message: 'Ingrediente adicionado ao carrinho com sucesso!',
        data: { ingredient_id, quantity },
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        message: 'Erro ao adicionar ingrediente ao carrinho.',
      });
    }
  }
      
}
