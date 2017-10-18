const fastify = require('fastify')()
const cors = require('cors')
const Octokat = require('octokat')

fastify.use(cors())
fastify.get('/', async (request, reply) => {
    reply.send({ hello: 'world' })
})

fastify.post('/approve', async (request, reply) => {
    console.log(request.body)
    reply.send({ hello: 'world' })
})

// const { token } = this.props
// const octo = new Octokat({
//     token
// })
// const res = await octo
//     .repos(routeParams[0], routeParams[1])
//     .pulls(routeParams[3])
//     .reviews.create({
//         event: APPROVE,
//         body: 'Very good code!'
//     })
// console.log(res)
//

// Run the server!
fastify.listen(8000, function(err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
