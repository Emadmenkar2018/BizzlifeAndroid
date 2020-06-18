import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const Logo = () => (
  <Image resizeMode={'contain'} source={require('../../assets/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    padding :50,
    width: responsiveWidth(70), 
    marginBottom: 12,
  },
});

export default memo(Logo);