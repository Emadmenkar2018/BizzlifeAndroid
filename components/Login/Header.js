import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../utils/theme';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: responsiveScreenFontSize(3),
    color: theme.colors.white,
    fontWeight: 'bold', 
    alignSelf:'center',
    marginBottom:responsiveHeight(4)
  },
});

export default memo(Header);