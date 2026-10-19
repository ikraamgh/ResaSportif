import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listItems: [],
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setListItems: (state, action) => {
            state.listItems = action.payload;
        },
    },
});

export const { setListItems } = itemsSlice.actions;
export default itemsSlice.reducer;
