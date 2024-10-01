import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/products';
import sizesReducer from './sizes/sizes';
import basketReducer from './basket/basket';

export default configureStore({
    reducer: {
        products: productsReducer,
        sizes: sizesReducer,
        basket: basketReducer
    }
})