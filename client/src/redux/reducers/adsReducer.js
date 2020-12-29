import { createReducer } from "@reduxjs/toolkit";
import { fetchAds,fetchSharesAds,fetchSalesAds,fetchRecommendedAds,fetchHotsAds } from '../actions/adsAction';


const initialState = {
  loading: false,
  data: [],
  sharesAds: [],
  salesAds: [],
  recommendedAds: [],
  hotsAds: [],
  error: null
};

const adsReducer = createReducer(initialState, {
  [fetchAds.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchAds.fulfilled]: (state, action) => {
    state.data = action.payload;
    state.loading = false;
  },
  [fetchAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
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
    state.error = action.payload.error;
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
  [fetchRecommendedAds.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchRecommendedAds.fulfilled]: (state, action) => {
    state.recommendedAds = action.payload;
    state.loading = false;
  },
  [fetchRecommendedAds.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
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
    state.error = action.payload.error;
  }
});


export default adsReducer;