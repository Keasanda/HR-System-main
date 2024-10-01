// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5239/api'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
