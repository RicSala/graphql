import { getAllProducts } from "./products.model"

export const productsResolver = {
    Query: { 
        products: (parent) => { 
            console.log("Getting products...")
            return getAllProducts()
        }, 
    }
}
