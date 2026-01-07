const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Resolve @shopify/react-native-skia issues by prioritizing compiled code over TS source
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'mjs'];
config.resolver.resolverMainFields = ['sbmodern', 'browser', 'module', 'main'];

module.exports = config;
