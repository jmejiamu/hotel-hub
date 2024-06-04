import React from "react";
import { Animated } from "react-native";

interface FadeAnimationProps {
  fadeAnim: Animated.Value;
  children: React.ReactNode;
}

export const FadeView = (props: FadeAnimationProps) => {
  const { fadeAnim, children } = props;
  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};
