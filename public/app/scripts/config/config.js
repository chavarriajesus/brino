// scripts/config/config.js

// Detects environment automatically
const isLocal =
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1';

// API base URL
export const API_BASE = isLocal
  ? 'https://brino.mx'  // production endpoint
  : '';

// (Optional) other shared constants
export const APP_VERSION = '1.0.0';
export const APP_NAME = 'Brino Dashboard';
