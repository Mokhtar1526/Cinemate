const { createSlice } = require("@reduxjs/toolkit");

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState:{favourites:[]},
    reducers: {
        addFavourite: (state, action) => {
            state.favourites.push(action.payload);
        },
        removeFavourite: (state, action) => {
            state.favourites = state.favourites.filter(favourite => favourite.id !== action.payload);
        }
    }
})


export const {addFavourite,removeFavourite} = favouritesSlice.actions;
export default favouritesSlice.reducer;