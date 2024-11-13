import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const RecipesController = () => import('#controllers/recipes_controller')

router
  .group(() => {
    router.get('/', [UsersController, 'index']).as('lista')
    router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
    router.post('/', [UsersController, 'create']).as('create')
  })
  .prefix('users')
  .as('users')

  router.get('/recipes', [RecipesController, 'index']).as('recipes.index')
  router.get('/recipes/:id', [RecipesController, 'show']).as('recipes.show')
  router.post('/recipes', [RecipesController, 'store']).as('recipes.store')

