import express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

const root = {
    products: [
        {
            id: 'redshoe',
            description: 'Red Shoe',
            price: 42.12
        },

        {
            id: 'bluejean',
            description: 'Blue Jeans',
            price: 55.55
        }

    ],

    orders: [
        {
            date: '2005-05-05',
            subtotal: 90.22,
            items: [
                {
                    product: {
                        id: 'redshow',
                        description: 'old red shoe',
                        price: 45.11
                    },
                    quantity: 2,
                }
            ]

        }
    ]
}

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }

    type Product {
        id: ID!
        description: String!
        reviews: [Review]
        price: Float!
    }

    type Review {
        rating: Int!
        comment: String
    }

    type Order {
        date: String!
        subtotal: Float!
        items: [OrderItem]
    }

    type OrderItem {
        product: Product!
        quantity: Int!
    }
`)

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


// RESOURCES:
// https://graphql.org/swapi-graphql --> included out-of-the-box in the graphql module
// As our projects and our schema get larger we need to organize them. graphql tools --> https://graphql-tools.com (use under the hood by Apollo framework, but it does not force you
// to use all the Apollo framework).
// - Splitting up schemas and merging them back
// - Database mocking
// - ... --> make well organized graphql servers