module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': ['./src/components'],
          '@constants': ['./src/constants'],
          '@screens': ['./src/screens'],
          '@store': ['./src/store'],
          '@svgs': ['./src/assets/svgs'],
          '@pngs': ['./src/assets/pngs'],
          '@types': ['./src/types'],
          '@apollo': ['./src/apollo'],
        },
        extensions: ['.ts', '.tsx', '.png', '.svg'],
        root: ['./src'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
