import { createReducer } from "@reduxjs/toolkit";
import { setIsOpenAd,fetchAds,fetchSharesAds,fetchSalesAds,fetchRecommendedAds,fetchHotsAds,fetchRunAds } from '../actions/adsAction';


const initialState = {
  loading: false,
  data: [],
  pages: 0,
  sharesAds: [],
  salesAds: [],
  recommendedAds: [],
  hotsAds: [],
  runAds: [],
  openAd: false,
  error: null
};

const adsReducer = createReducer(initialState, {
  [setIsOpenAd.type]: (state,action) => {
    state.openAd = action.payload;
  },
  [fetchAds.pending]: (state) => {
    state.loading = true;
    state.pages = 1;
    state.error = null
  },
  [fetchAds.fulfilled]: (state, action) => {
    state.data = action.payload[0];
    state.pages = action.payload[1];
    state.loading = false;

  },
  [fetchAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchSharesAds.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchSharesAds.fulfilled]: (state, action) => {
    state.sharesAds = action.payload;
    state.loading = false;
  },
  [fetchSharesAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchSalesAds.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchSalesAds.fulfilled]: (state, action) => {
    state.salesAds = action.payload;
    state.loading = false;
  },
  [fetchSalesAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
  [fetchRecommendedAds.fulfilled]: (state, action) => {
    state.recommendedAds = action.payload;
    state.loading = false;
  },
  [fetchRecommendedAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchHotsAds.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchHotsAds.fulfilled]: (state, action) => {
    state.hotsAds = action.payload;
    state.loading = false;
  },
  [fetchHotsAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchRunAds.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchRunAds.fulfilled]: (state, action) => {
    state.runAds = action.payload;
    state.loading = false;
  },
  [fetchRunAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
});


export default adsReducer;