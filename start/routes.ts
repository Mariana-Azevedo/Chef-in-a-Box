import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const RecipesController = () => import('#controllers/recipes_controller')

router.on('/').render('pages/home/show').as('home.show')

router.get('/login', [AuthController, 'create']).as('auth.create')
router.post('/login', [AuthController, 'store']).as('auth.store')
router.get('/logout', [AuthController, 'destroy']).use(middleware.auth()).as('auth.destroy')

router
  .group(() => {
    router.get('/', [UsersController, 'index']).as('lista')
    //router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
    router.post('/', [UsersController, 'store']).as('store')
  })
  .prefix('users')
  .as('users')


  router.get('/', ({view}) => {
    return view.render('pages/loginForm.edge')

router
  .group(() => {
    router.get('/', [RecipesController, 'index']).as('recipes.index')
    router.get('/:id', [RecipesController, 'show']).as('recipes.show')
    router.post('/', [RecipesController, 'store']).as('recipes.store')
  })
  .prefix('recipes')
  .as('recipes')


  router.get('/Criar-conta', ({view}) => {
    return view.render('pages/criarConta.edge')
  })

  router.get('/home', ({view}) => {
    return view.render('pages/home.edge')
  })
  //router.get('/criarConta', [RecipesController, 'index']).as('criarConta.edge')

  router.get('/recipes', [RecipesController, 'index']).as('recipes.index')
  router.get('/recipes/:id', [RecipesController, 'show']).as('recipes.show')
  router.post('/recipes', [RecipesController, 'store']).as('recipes.store')


