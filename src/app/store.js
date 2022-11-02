import { configureStore } from '@reduxjs/toolkit'
import themeSlice  from '../stores/theme'

export const store = configureStore({
  reducer: {
    changeTheme: themeSlice
  },
})