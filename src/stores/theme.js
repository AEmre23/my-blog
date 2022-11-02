import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dark: false,
}

export const themeSlice = createSlice({
  name: 'darktheme',
  initialState,
  reducers: {
    changeTheme: (state,action) => {
      state.dark = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer