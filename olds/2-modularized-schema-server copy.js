import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import url from 'url'
import products from './products/products.model.js'
import orders from './orders/orders.model.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import { loadFilesSync } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema'



// const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql')) //look into any directory or subd matching any files that end in .graphql
// now you can do as follows instead:

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const root = {
    products: products,
    orders: orders
}


const schema = makeExecutableSchema({
    typeDefs: typesArray 
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //enables graphiql front-end application
    // Example: http://localhost:3000/graphql?query=%7B%0A%20%20products%20%7B%0A%20%20%20%20description%0A%20%20%7D%0A%09orders%20%7B%0A%20%20%20%20subtotal%0A%20%20%20%20items%20%7B%0A%20%20%20%20%20%20quantity%0A%20%20%20%20%20%20product%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20price%0A%20%20%20%20%20%20%20%20reviews%20%7B%0A%20%20%20%20%20%20%20%20%20%20comment%0A%20%20%20%20%20%20%20%20%20%20rating%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%0A%7D%0A%0A

}))



app.listen(3000, () => {
    console.log("Running GraphQl server in port 3000...")
})


// NOTES:
// With graphql-tools (makeExecutableSchema and loadFilesSync functions) we can now split our type definitions into different files / folders
// 1.- Split / create the different files with the type definitions.
// 2.- Call the loadSyncFile() function to merge those files into one file, storing the returned array in a const
// 3.- Call makeExecutableSchema using the previous consts as the value for the "typeDefs"
//
// RESOLVERS:
// When a graphql server receives a request, it...
// 1.- Validates it's a proper graphql query
// 2.- Call the resolver function to get the value for each field.
// 3.- When the server has found all the resolvers functions, it wraps those values and send it back to the frontend
// In this example, we don't need them because the data is static: Our "data models" are just variables within our project, which is not very realistic.
// But resolvers are powerfull when we need to work with information from a database or from an API
// They act as "middleware" from that databse / api to serve graphql queries to our server
