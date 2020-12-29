import { createSelector } from '@reduxjs/toolkit'

export const getAds = createSelector(
  state => state.ads.data,
  ads => ads
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

export const getGoldAds = createSelector(
  getAds,
  ads => ads.filter(ad => ad.status === 'gold').reverse()
);

export const getSilverAds = createSelector(
  getAds,
  ads => ads.filter(ad => ad.status === 'silver').reverse()
);

export const getCommonAds = createSelector(
  getAds,
  ads => ads.filter(ad => ad.status === 'common').reverse()
);