module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { worklets: false }],
    ],
    overrides: [
      {
        // Only apply worklets plugin to our source files, not node_modules
        exclude: /node_modules/,
        plugins: ['react-native-worklets/plugin'],
      },
    ],
  };
};
