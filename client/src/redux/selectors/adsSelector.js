import { createSelector } from '@reduxjs/toolkit'




export const getAds = createSelector(
  state => state.ads.data,
  ads => ads
);

export const isOpenAd = createSelector(
  state => state.ads.openAd,
  openAd => openAd
);

export const getLoading = createSelector(
  state => state.ads.loading,
  loading => loading
);

export const getPages = createSelector(
  state => state.ads.pages,
  pages => pages
);

export const getSharesAds = createSelector(
  state => state.ads.sharesAds,
  ads => ads
);

export const getSalesAds = createSelector(
  state => state.ads.salesAds,
  ads => ads
);

export const getRecommendedAds = createSelector(
  state => state.ads.recommendedAds,
  ads => ads
);

export const getHotsAds = createSelector(
  state => state.ads.hotsAds,
  ads => ads
);

export const getRunsAds = createSelector(
  state => state.ads.runAds,
  ads => ads
);