//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../styles/colors";
import fontFamily from "../styles/fontFamily";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../styles/responsiveSize";

// create a component
const CircularImages = ({ data = [], size = 60 }) => {
  const styles = stylesFun({ size });
  return (
    <View style={styles.container}>
      {data.map((val, i) => {
        if (i < 3 && !val?.display_image.includes("default_image")) {
          return (
            <FastImage
              key={String(i)}
              source={{
                uri: val?.display_image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={{
                ...styles.radiusStyle,
                backgroundColor: colors.blackOpacity20,
                marginLeft: i == 0 ? 0 : -16,
              }}
            />
          );
        }
        if (i < 3 && val?.display_image.includes("default_image")) {
          return (
            <View
              style={{
                backgroundColor: " rgba(0,0,0,0.70)",

                width: moderateScale(35),
                height: moderateScale(35),
                borderRadius: moderateScale(35 / 2),
                // marginH: moderateScale(15),
                alignItems: "center",
                justifyContent: "center",
                marginLeft: i == 0 ? 0 : -16,
              }}
            >
              <Text
                style={{
                  fontSize: textScale(20),
                  textTransform: "uppercase",
                  color: colors.white,
                }}
              >
                {!!val?.username && val?.username?.charAt(0)}
              </Text>
            </View>
          );
        }
      })}

      {data.length > 3 ? (
        <View style={styles.radiusStyle}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            +{data.length - 3}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

// define your styles

const stylesFun = ({ size }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: moderateScaleVertical(8),
    },
    radiusStyle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginLeft: -20,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return styles;
};

export default CircularImages;
