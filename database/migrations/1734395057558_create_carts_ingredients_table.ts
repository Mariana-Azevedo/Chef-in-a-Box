import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carts_ingredients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('quantity')
      table.integer('cart_id').unsigned().references('cart.id')
      table.integer('ingredient_id').unsigned().references('ingredients.id')
      table.unique(['cart_id', 'ingredient_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}