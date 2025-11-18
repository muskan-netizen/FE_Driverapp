// CustomSwitch.js
import React, { useState, useEffect } from "react";
import { Animated, Pressable, View, StyleSheet } from "react-native";
import colors from "../styles/colors";

const CustomSwitch = ({
  value = false,
  onValueChange = () => {},
  disabled = false,
  activeColor = colors.themeColor, // iOS green
  inactiveColor = "#e5e5ea",
  thumbColor = "#fff",
  size = 40,
}) => {
  const [isOn, setIsOn] = useState(value);
  const offset = new Animated.Value(isOn ? 1 : 0);

  useEffect(() => {
    Animated.timing(offset, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const toggle = () => {
    if (disabled) return;
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange(newValue);
  };

  const trackWidth = size ;
  const trackHeight = size * 0.6;
  const thumbSize = size * 0.55;
  const thumbTranslate = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [2, trackWidth - thumbSize - 2],
  });

  const trackColor = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <Pressable onPress={toggle} disabled={disabled}>
      <Animated.View
        style={[
          styles.track,
          {
            width: trackWidth,
            height: trackHeight,
            backgroundColor: trackColor,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbTranslate }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: 20,
    justifyContent: "center",
    padding: 2,
  },
  thumb: {
    borderRadius: 50,
    elevation: 3, // subtle shadow on Android
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
});

export default CustomSwitch;
