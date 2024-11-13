import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
    vine.object({
      email: vine.string().email().trim(),
      password: vine.string().minLength(3).confirmed()
    })
  )