import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducer/user'
import { sellerReducer } from './reducer/seller'
import { productReducer } from './reducer/product'
import { eventReducer } from './reducer/event'
import { wishlistReducer } from './reducer/wishlist'
import { cartReducer } from './reducer/cart'
import { orderReducer } from './reducer/order'

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        event: eventReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        order: orderReducer,
    }
})

export default Store