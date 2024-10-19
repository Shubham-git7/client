import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    reloadData: (state, action) =>{
        state.reloadData = action.payload;
    }
  },
});

export default rootSlice.reducer;
export const { showLoading, hideLoading, setPortfolioData,  reloadData } = rootSlice.actions;

