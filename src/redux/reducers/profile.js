import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "akil",
    cart: {}
  },
  reducers: {
    SET_NAME(state, action){
      state.name = action.payload
    }
  }
})

export const {SET_NAME, SET_CART} = profileSlice.actions

export default profileSlice.reducer
