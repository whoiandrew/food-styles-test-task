import React from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoIcon from '@pngs/logo.png';

const Header: React.FC = () => (
  <>
    <Image source={LogoIcon} style={style.logo} />
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#fa7745', '#f3c442']}
      style={style.container}
    />
    <LinearGradient
      locations={[1, 0.85, 0.2, 1]}
      colors={['#ffffffff', '#fdfdfdcc', '#fdfdfd26', '#f8f8f8']}
      style={style.foredrop}
    />
  </>
);

const style = StyleSheet.create({
  logo: {
    top: 29,
    left: 19,
    position: 'absolute',
  },
  container: { height: 157, zIndex: -1, position: 'relative' },
  foredrop: {
    height: 80,
    position: 'absolute',
    top: 89,
    width: '100%',
  },
});

export default Header;
