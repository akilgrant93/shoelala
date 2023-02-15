import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    name: {}
  },
  reducers: {
    SET_CART(state, action){
      state.name = action.payload
    },
  }
})

export const {SET_CART} = cartSlice.actions

export default cartSlice.reducer
