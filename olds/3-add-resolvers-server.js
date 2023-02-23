import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import url from 'url'
import products from './products/products.model.js'
import orders from './orders/orders.model.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import { loadFilesSync } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema'




const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const root = {
    products: products,
    orders: orders
}


const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: {
        Query: { //when we are fetching some data from our server, we add this resolver to each one of the root values of our schema
            products: async (parent, args, context, info) => { //parent = root; args = used when we have param queries (with conditions) ; context = useful for data shared among all resolvers ; info = information about the current state of the operations
                console.log("Getting the products...")
                const products = await Promise.resolve(parent.products) //This is a silly example, but it simulates that we can now get data from Promises when we receive a request to the server, and serve that request with the promise returned data...--> this enables us to use databases and APIs as the source!
            }, 
            orders: (parent) => {
                console.log("Getting the orders...")
                return parent.orders
            },

        }
    }
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, 
}))



app.listen(3000, () => {
    console.log("Running GraphQl server in port 3000...")
})


// NOTES 
// Every graphql server has two components: schemas and resolvers.
// The server will 1st check if the request is valid using our schemas and 2nd find those values using the resolvers
// But in bigger projects with more resolvers, this can get messy. In the next section we see how to modulirez resolvers as we did with models, and schemas
