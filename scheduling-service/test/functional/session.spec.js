const { test, trait } = use('Test/Suite')('Session')

/** @type { typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

trait('Test/ApiClient')

test('it should return JWT token when session created', async ({ assert, client }) => {
  const user = await User.create({
    name: 'Ederson Machado',
    email: 'edersonmberti@gmail.com',
    password: '12345678',
  })

  const response = await client
  .post('/sessions')
  .send({
    email: 'edersonmberti@gmail.com',
    password: '12345678',
  })
  .end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})
