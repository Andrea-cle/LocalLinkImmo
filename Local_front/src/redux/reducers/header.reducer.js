import { createSlice } from "@reduxjs/toolkit";

const HEADER_STATE = {
  isMobilMenuOpen: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState: HEADER_STATE,
  reducers: {
    toggleMobilMenu: (state, action) => {
      state.isMobilMenuOpen = !state.isMobilMenuOpen;
    },
  },
});

// export const { toggleMobilMenu } = headerSlice.action;
export default headerSlice.reducer;
