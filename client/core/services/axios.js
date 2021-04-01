/**
 * Axios service.
 *
 * @module services/axios
 */

import config from '@/shared/configs/http';
import axios from 'axios';

import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 15 * 60 * 1000,

  readHeaders: true,

  exclude: {
    query: false // disable query exclusion
  }
});

export default axios.create({
  baseURL: config.baseURL,

  adapter: cache.adapter,

  withCredentials: true
});
