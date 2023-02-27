import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  withTiming,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

interface BackdropProps {
  open: Animated.SharedValue<number>;
}
const Backdrop = ({ open }: BackdropProps) => {
  const animatedProps = useAnimatedProps(() => ({
    pointerEvents: open.value < 1 ? ("none" as const) : ("box-none" as const),
  }));
  const style = useAnimatedStyle(() => ({
    backgroundColor: "green",
    opacity: 0.7 * open.value,
  }));
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, style]}
      animatedProps={animatedProps}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => (open.value = withTiming(0))}
      />
    </Animated.View>
  );
};

export default Backdrop;
