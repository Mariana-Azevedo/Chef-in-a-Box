import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Ingredient from './ingredient.js'
import * as relations from '@adonisjs/lucid/types/relations'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Recipe extends BaseModel {

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare description: string

    @column()
    declare instructions: string

    @column()
    declare cuisine: string

    @column()
    declare image: string

    @manyToMany(() => Ingredient, {
        pivotTable: 'recipe_ingredients', 
        pivotColumns: ['quantity'],
    })
    declare ingredients: ManyToMany<typeof Ingredient>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}