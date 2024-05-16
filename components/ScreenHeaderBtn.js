import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS, SIZES } from "../constants";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress} >
      <Image source={iconUrl} resizeMode="cover" style={styles.btnImg(dimension)}></Image>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.gray1,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});

export default ScreenHeaderBtn;
