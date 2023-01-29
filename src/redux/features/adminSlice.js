import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      //状態に情報をセット(保存)しておく。
      state.value = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
