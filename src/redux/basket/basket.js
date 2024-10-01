import { createSlice } from '@reduxjs/toolkit';

export const basket = createSlice({
    name: 'basket',
    initialState: {
        basket: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.basket.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.basket.splice(action.payload, 1);
        }
    }
})

export const { addProduct, deleteProduct } = basket.actions;
export default basket.reducer;