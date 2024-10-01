import { createSlice } from '@reduxjs/toolkit';

export const sizes = createSlice({
    name: 'sizes',
    initialState: {
        sizes: []
    },
    reducers: {
        setSizes: (state, action) => {
            state.sizes = action.payload;
        }
    }
})

export const { setSizes } = sizes.actions;
export default sizes.reducer;