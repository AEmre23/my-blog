import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../stores/user'
import postsSlice from '../stores/posts'

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
  },
})