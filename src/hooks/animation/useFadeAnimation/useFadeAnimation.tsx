import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useFadeAnimation = (duration: number) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, []);

  return { fadeAnim };
};
