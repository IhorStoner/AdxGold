import { createAsyncThunk,createAction  } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'

export const fetchAds = createAsyncThunk('ads/fetchAds', async ({page,city}) => {

  const data = axios.get(`${config.serverUrl}/api/ads?page=${page}&city=${city}`).then(
    res => res.data)
  return data;
});

export const fetchSharesAds = createAsyncThunk('ads/fetchSharesAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/ads/sharesAdverts`).then(
    res => res.data)
  return data;
});

export const fetchSalesAds = createAsyncThunk('ads/fetchSalesAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/ads/salesAdverts`).then(
    res => res.data)
  return data;
});

export const fetchRecommendedAds = createAsyncThunk('ads/fetchRecommendedAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/ads/recommendedAdverts`).then(
    res => res.data)
  return data;
});

export const fetchHotsAds = createAsyncThunk('ads/fetchHotsAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/ads/hotsAdverts`).then(
    res => res.data)
  return data;
});

export const fetchRunAds = createAsyncThunk('ads/fetchRunAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/ads/runAdverts`).then(
    res => res.data)
  return data;
});