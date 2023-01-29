import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action) => {
      //状態に情報をセット(保存)しておく。
      state.value = action.payload;
    },
  },
});

export const { setStore } = storeSlice.actions;
export default storeSlice.reducer;
