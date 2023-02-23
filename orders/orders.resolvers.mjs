import { getAllOrders } from "./orders.model"

export const orderResolver = 
{
    Query: { 
        orders: (parent) => {
            console.log("Getting orders...")

            return getAllOrders() // Best practice is to keep the resolver functions as thin as possible and use the functionality of the models to get the data
        },

    }
}
