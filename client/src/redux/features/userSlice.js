import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        listFavourites: []
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload === NULL) {
                localStorage.removeItem("actkn");
            } else {
                if (action.payload.token) localStorage.setItem("actkn", action.payload.token);
            }
            state.user = action.payload;
        },
        setListFavourites: (state, action) => {
            state.listFavourites = action.payload;
        },
        removeFavourite: (state, action) => {
            const { mediaid } = action.payload;
            state.listFavourites = [...state.listFavourites].filter(e => e.mediaid.toString() !== mediaid.toString());
        },
        addFavourites: (state, action) => {
            state.listFavourites = [action.payload, ...state.listFavourites];
        }
    }
});

export const { setUser, setListFavourites, addFavourites, removeFavourite } = userSlice.actions;
export default userSlice.reducer;