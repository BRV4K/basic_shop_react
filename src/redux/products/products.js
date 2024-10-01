import { createSlice } from '@reduxjs/toolkit';

export const products = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { setProducts } = products.actions;
export default products.reducer;