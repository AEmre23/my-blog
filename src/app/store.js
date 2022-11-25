import { configureStore } from '@reduxjs/toolkit'
import userSlice  from '../stores/user'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})