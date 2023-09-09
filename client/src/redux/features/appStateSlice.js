import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice({
    name: "AppState",
    initialState: {
        appState: ""
    },
    reducers: {
        appStateMode: (state, action) => {
            state.appState = action.payload;
        }
    }
});

export const { setThemeMode } = appStateSlice.actions;

export default appStateSlice.reducer;