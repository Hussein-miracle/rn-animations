import React from "react";
import * as shape from "d3-shape";
import { SafeAreaView, Dimensions, StyleSheet, View } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
} from "react-native-reanimated";
import StaticTabBar from "./StaticTabBar";
import { tabHeight } from "./StaticTabBar";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const width = Dimensions.get("window").width;

const height = tabHeight;

const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];

export const tabWidth = width / tabs.length;

const tab = shape
  .line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(shape.curveBasis)([
  [width, 0],
  [width + 5, 0],
  [width + 10, 10],
  // [width + 12.5, height - 10],
  [width + 15, height],
  [width + tabWidth - 15, height],
  // [width + tabWidth - 12.5, height - 10],
  [width + tabWidth - 10, 10],
  [width + tabWidth - 5, 0],
  [width + tabWidth, 0],
]);

const left = shape
  .line()
  .x((d) => d[0])
  .y((d) => d[1])([
  [0, 0],
  [width, 0],
]);

const right = shape
  .line()
  .x((d) => d[0])
  .y((d) => d[1])([
  [width + tabWidth, 0],
  [width * 2, 0],
  [width * 2, height],
  [0, height],
  [0, 0],
]);

const center = shape
  .line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(shape.curveBasis)([
  [width + tabWidth, 0],
  [width + tabWidth - 5, 0],
  [width + tabWidth - 10, 10],

  // [width + tabWidth - 12.5, height - 10],
  [width + tabWidth - 15, height],
  [width + 15, height],
  // [width + 12.5, height - 10],

  [width + 10, 10],
  [width + 5, 0],
  [width, 0],
]);

const d = `${left} ${tab} ${right}`;

const revD = `${right} ${center} ${left}`;
console.log(revD, "revD");

interface ITabBar {}

const TabBar: React.FC<ITabBar> = () => {
  const X = useSharedValue(-width);
  const animatedStyles = {
    animatedI: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: X.value }],
      };
    }),
  };

  const setValue = (num: number) => {
    X.value = withSpring(num);
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <View {...{ height, width }}>
        <AnimatedSvg
          width={width * 7}
          height={height * 5}
          style={[styles.tab, animatedStyles.animatedI]}
        >
          <Path {...{ d }} fill="white" />
        </AnimatedSvg>

        <View style={StyleSheet.absoluteFill}>
          <StaticTabBar tabs={tabs} value={X.value} setValue={setValue} />
        </View>
      </View>
      <SafeAreaView style={styles.SA} />
    </View>
  );
};

const styles = StyleSheet.create({
  SA: {
    backgroundColor: "green",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
