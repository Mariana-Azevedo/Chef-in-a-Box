import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const RecipesController = () => import('#controllers/recipes_controller')

 router.on('/').render('pages/home/home').as('home.show').use(middleware.silent());


router.get('/login', [AuthController, 'create']).as('auth.create')
router.post('/login', [AuthController, 'store']).as('auth.store')
router.get('/logout', [AuthController, 'destroy']).use(middleware.auth()).as('auth.destroy')

router.get('/test-protected', async ({ auth, response }) => {
  if (auth.isAuthenticated) {
    return response.json({ message: 'Rota protegida acessada com sucesso!', user: auth.user });
  } else {
    return response.unauthorized({ error: 'Usuário não autenticado' });
  }
}).use(middleware.auth());


router
  .group(() => {
    router.get('/create', [UsersController, 'create']).as('users.create')
    //router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
    router.post('/', [UsersController, 'store']).as('users.store')
  })
  .prefix('users')


router
  .group(() => {
    router.get('/', [RecipesController, 'index']).as('recipes.index')
    router.get('/:id', [RecipesController, 'show']).as('recipes.show')
    router.post('/', [RecipesController, 'store']).as('recipes.store')
    router.get('/new', [RecipesController, 'create']).as('recipe.create')
  })
  .prefix('recipes')



  router.get('/home', ({view}) => {
    return view.render('pages/home.edge')
  })
  //router.get('/criarConta', [RecipesController, 'index']).as('criarConta.edge')



