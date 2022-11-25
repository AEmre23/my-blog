import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "isLoggedIn",
  initialState : { value: { name: "", email: "", } },
  reducers: {
    setLogin: (state,action) => {
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLogin } = userSlice.actions

export default userSlice.reducer