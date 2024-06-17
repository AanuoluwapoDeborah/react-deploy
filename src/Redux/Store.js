import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductSlice";

const Store = configureStore({
    reducer: {
        productSlice: productSlice,
    },
});

export default Store;