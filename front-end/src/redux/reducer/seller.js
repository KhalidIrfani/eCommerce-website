import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isloading: true,

}

export const sellerReducer = createReducer(initialState, {
    LoadSellerRequest: (state) => {
        state.isloading = true;
    },
    LoadSellerSuccess: (state, action) => {
        state.isSeller = true;
        state.isloading = false;
        state.seller = action.payload;
    },
    LoadSellerFailed: (state, action) => {
        state.isloading = false;
        state.error = action.payload;
        state.isSeller = false
    },
    clearErrors: (state) => {
        state.error = null;
    }
})

