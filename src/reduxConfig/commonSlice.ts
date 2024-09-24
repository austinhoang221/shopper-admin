import { createSlice } from "@reduxjs/toolkit";

interface ICommonState {
  isMenuExpand: boolean;
}

const initialState: ICommonState = {
  isMenuExpand: true,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    updateIsMenuExpand: (state) => {
      state.isMenuExpand = !state.isMenuExpand;
    },
  },
});
export const { updateIsMenuExpand } = commonSlice.actions;
export default commonSlice.reducer;
