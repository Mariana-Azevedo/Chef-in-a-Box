import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
      email: vine.string().email().trim(),
      password: vine.string().minLength(3).confirmed()
    })
  )