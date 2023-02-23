import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { loadFilesSync } from '@graphql-tools/load-files'
import { makeExecutableSchema } from '@graphql-tools/schema'




const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.mjs']
})

console.log(resolversArray)

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
})

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, 
}))



app.listen(3000, () => {
    console.log("Running GraphQl server in port 3000...")
})


