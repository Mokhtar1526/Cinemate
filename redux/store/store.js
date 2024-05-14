import { configureStore } from "@reduxjs/toolkit";
import favouritesSlice from "../slices/favouritesSlice";

const store = configureStore({
    reducer: {
        favourites:favouritesSlice
    }
})

export default store;