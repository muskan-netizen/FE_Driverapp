import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, PanResponder, Text, View} from 'react-native';
import colors from '../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../styles/responsiveSize';

interface SlideToComplete {
  onScrollComplete: (taskStatus: number) => void;
  statusTitle?: string;
  taskStatus: number;
}
const maxSlide = width - moderateScale(120) - moderateScale(8);
const SlideToComplete: React.FC<SlideToComplete> = ({
  onScrollComplete,
  statusTitle,
  taskStatus,
}) => {
  useEffect(() => {
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  }, [taskStatus]);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
        onPanResponderRelease: (e, gesture) => {
          if (gesture.moveX > moderateScale(width - 60)) {
              onScrollComplete(taskStatus);
          } else {
            Animated.spring(pan, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    [pan, width, onScrollComplete, taskStatus],
  );

  const color1 = colors.lightSkyE;
  const color2 = colors.blackOpacity10;

  const bgColor = pan.x.interpolate({
    inputRange: [0, maxSlide],
    outputRange: [color1, color2],
    extrapolate: 'clamp',
  });

  const translateX = pan.x.interpolate({
    inputRange: [0, maxSlide],
    outputRange: [0, maxSlide],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        backgroundColor: bgColor,
        marginVertical: moderateScaleVertical(12),
      }}>
      <View
        style={{
          width: moderateScale(120),
          height: moderateScaleVertical(70),
          margin: moderateScale(4),
        }}>
        <Animated.View
          style={{
            transform: [{translateX}],
            width: '100%',
            height: '100%',
            backgroundColor: colors.themeColor,
            borderRadius: moderateScale(60),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...panResponder.panHandlers}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Slide To {statusTitle}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default SlideToComplete;
