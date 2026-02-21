const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

process.env.EXPO_ROUTER_APP_ROOT = path.join(__dirname, 'app');

module.exports = config;
