import { configureStore } from "@reduxjs/toolkit";

import profileReducer from './reducers/profile'
import cartReducer from './reducers/cart'

export default configureStore({
  reducer:{
    profile: profileReducer,
    cart: cartReducer
  }
})
