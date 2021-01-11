import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'

export const fetchAds = createAsyncThunk('ads/fetchAds', async ({page,city,price,date}) => {
  let selectedFilterPrice = null;
  if(price === 'По убыванию') {
    selectedFilterPrice = 'low'
  } else if(price === 'По возрастанию'){
    selectedFilterPrice = 'high'
  }
  let selectedFilterDate = null;
  if(date === 'Сначала новые') {
    selectedFilterDate = 'low'
  } else if(date === 'Сначала старые'){
    selectedFilterDate = 'high'
  }

  const data = axios.get(`${config.serverUrl}/api/offer?page=${page}&city=${city}&price=${selectedFilterPrice}&date=${selectedFilterDate}`).then(
    res => res.data)
  return data;
});

export const fetchSharesAds = createAsyncThunk('offer/fetchSharesAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/offer/sharesAdverts`).then(
    res => res.data)
  return data;
});

export const fetchSalesAds = createAsyncThunk('offer/fetchSalesAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/offer/salesAdverts`).then(
    res => res.data)
  return data;
});

export const fetchRecommendedAds = createAsyncThunk('offer/fetchRecommendedAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/offer/recommendedAdverts`).then(
    res => res.data)
  return data;
});

export const fetchHotsAds = createAsyncThunk('offer/fetchHotsAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/offer/hotsAdverts`).then(
    res => res.data)
  return data;
});

export const fetchRunAds = createAsyncThunk('offer/fetchRunAds', async () => {
  const data = axios.get(`${config.serverUrl}/api/offer/runAdverts`).then(
    res => res.data)
  return data;
});
