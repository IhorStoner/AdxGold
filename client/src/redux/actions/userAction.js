import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const userId = JSON.parse(localStorage.getItem('userData')).userId
  const data = axios.get(`${config.serverUrl}/api/users/${userId}`).then(
    res => res.data)
  return data;
});



