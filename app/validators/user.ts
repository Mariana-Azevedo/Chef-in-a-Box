import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
      fullName: vine.string().trim(),
      email: vine.string().email().trim(),
      password: vine.string().minLength(3).confirmed()
    })
  )