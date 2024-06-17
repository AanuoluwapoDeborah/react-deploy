import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFetching: false,
    fetchedData: [],
    fetchError: null
};

const productSlice = createSlice({
    name: "ProductSlice",
    initialState,
    reducers:{
        fetchingProducts: (state) => {
            state.isFetching = true;
            state.fetchedData = [];
            state.fetchError = null;
        },
        fetchingProductSuccessful: (state, action) => {
            state.isFetching = false;
            state.fetchedData = action.payload;
            state.fetchError = null;
        },
        fetchingFailed: (state, action) => {
            state.isFetching = false;
            state.fetchedData = [];
            state.fetchError = action.payload;
        },
    },
});

export const {fetchingProducts, fetchingProductSuccessful, fetchingFailed} = productSlice.actions;

export default productSlice.reducer;