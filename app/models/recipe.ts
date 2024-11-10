import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Recipe extends BaseModel {

    @column({ isPrimary: true })
    declare recipeId: number

    @column()
    declare title: string

    @column()
    declare image: string

    @column()
    declare imageType: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}