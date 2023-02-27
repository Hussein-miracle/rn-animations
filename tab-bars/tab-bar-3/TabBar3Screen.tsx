import React from "react";
import * as shape from "d3-shape";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import TabBar from "./components/TabBar";
import { TAB_HEIGHT, TAB_WIDTH } from "./components/StaticTabBar";
import Svg, { Path } from "react-native-svg";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
// console.log(height , 'height');
const MAX_VERTICAL_RANGE_FROM_TOP = height / 3;

const MAX_VERTICAL_RANGE_FROM_BOTTOM = height - MAX_VERTICAL_RANGE_FROM_TOP;

const MAX_VERTICAL_RANGE = height / 2 - TAB_HEIGHT / 2;

// console.log(MAX_VERTICAL_RANGE,'MVR');

const MAX = height / 2;

const W_2 = 0.1 * height;
const H_1 = 0.1 * height;
console.log(W_2, "w2");



const W = width;
const H = height / 3;
const W_H = height - H_1 * 5;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const TabBar3Screen = () => {
  const curve = shape.line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(shape.curveBasis)([
    [0,height - 1.25],

    [0.1 * width ,height * 0.95],
    [0.15 * width ,height * 0.9],
    [0.2 * width ,height * 0.85],
    [0.3 * width ,height * 0.75],
    // [0.35 * width ,height * 0.7],
    // [0.45 * width ,height * 0.8],

    
    // [0.65 * width ,  - height / 6],
    [0.5 * width ,  - height / 4],
    // [ - 0.65 * width ,  -height / 6],

    // [0.6 * width , height * 0.6],
    // [0.65 * width , height * 0.65],
    [0.75 * width , height * 0.75],
    [0.85 * width , height * 0.85],
    [0.9 * width , height * 0.9],
    [0.95 * width , height * 0.95],

    [width + 30,height]
  ])

  console.log(curve,'curVVV')
  // const curvedCenter = `M 187 2 Q 407 -452 568 0`;

  // const pathDir = `${curvedCenter}`;

  const Y = useSharedValue(0);
  const TABY = useSharedValue(0);
  const animationGestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // console.log(event, "eventStart");
    },
    onActive: (event, context) => {
      const value = event.translationY;
      // console.log(event, "eventactive");
      Y.value = value;
      TABY.value = value;
      // console.log(value, "activeVal");
      // console.log(MAX_VERTICAL_RANGE, "MVR");
    },
    onEnd: (event, context) => {},
    onCancel: (event, context) => {},
    onFinish: (event, context, isCanceledOrFailed) => {},
  });

  const animationStyles = {
    animatedText: useAnimatedStyle(() => {
      const opacityValue = Math.abs(
        interpolate(
          Y.value,
          [0, -MAX_VERTICAL_RANGE],
          [1, 0],
          Extrapolate.CLAMP
        )
      );

      //console.log(opacityValue,'YOps')

      return {
        opacity: withSpring(opacityValue),
        zIndex:30,
      };
    }),

    tabAnimeStyle: useAnimatedStyle(() => {
      const opacityValue = interpolate(
        TABY.value,
        [0, -TAB_HEIGHT],
        [1, 0],
        Extrapolate.CLAMP
      );
      // console.log(opacityValue,'tabYOps')
      // console.log(TABY.value, "atbY");
      return {
        opacity: withSpring(opacityValue),
      };
    }),
    centerBtn: useAnimatedStyle(() => {
      const translationY = interpolate(
        TABY.value,
        [0, -MAX_VERTICAL_RANGE_FROM_BOTTOM],
        [0, -MAX_VERTICAL_RANGE_FROM_BOTTOM],
        Extrapolate.CLAMP
      );

      // console.log(translationY,'tsY')
      // console.log(MAX_VERTICAL_RANGE_FROM_BOTTOM,'MAX_VERTICAL_RANGE_FROM_BOTTOM')
      // console.log(MAX_VERTICAL_RANGE_FROM_BOTTOM / 2,'MAX_VERTICAL_RANGE_FROM_BOTTOM / 2')
      const condition = Math.abs(translationY ) >= MAX_VERTICAL_RANGE_FROM_BOTTOM / 2 ;
      return {
        // opacity: opacityValue,
        transform: [{ translateY: withSpring(translationY) }],
        zIndex: 250,
        backgroundColor: condition ? "#fff" : "#ADD8E6",
        color: condition ? "#000" : "#888",
        elevation:3,
      };
    }),
    blueScreenStyles: useAnimatedStyle(() => {
      const opValue = interpolate(
        TABY.value,
        [0, -MAX_VERTICAL_RANGE / 8],
        [0, 1],
        Extrapolate.CLAMP
      );

      // console.log(opValue,'opValue');
      return {
        opacity: withSpring(opValue),
      };
    }),

    svgAnime:useAnimatedStyle(() => {
      const scale = interpolate(
        TABY.value,
        [0, -MAX_VERTICAL_RANGE_FROM_BOTTOM],
        [0, 0.75],
        Extrapolate.CLAMP
      );

      const opacity = interpolate(scale,[0,0.65],[1,0],
        Extrapolate.CLAMP)

      // console.log(scale,'scale')
      // console.log(opacity,'op from scale')
      return {
        transform:[ { translateY: height / 2 }, {scale :withSpring(scale)}, { translateY: -(height / 2) }],
        opacity: withSpring(opacity),
      }
    })
  };
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler onGestureEvent={animationGestureHandler}>
          <Animated.View
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
              // backgroundColor:'green',
            }}
          >
            <Animated.View style={styles.animeTextWrapper}>
              <Animated.Text
                style={[styles.animeText, animationStyles.animatedText]}
              >
                Events
              </Animated.Text>
            </Animated.View>
            <Animated.View
              style={[
                {
                  backgroundColor: "#ADD8E6",
                  width: "100%",
                  position: "absolute",
                  // bottom: TAB_HEIGHT,
                  zIndex: 20,
                  height,
                  justifyContent: "center",
                  alignItems: "center",
                },
                animationStyles.blueScreenStyles,
              ]}
            >
              <View style={{ marginTop: W_2 }}>
                <View style={styles.overlayTextWr}>
                  <Text style={styles.overlayText}>Reminder</Text>
                </View>
                <View style={styles.overlayTextWr}>
                  <Text style={styles.overlayText}>Camera</Text>
                </View>
                <View style={styles.overlayTextWr}>
                  <Text style={styles.overlayText}>Attachment</Text>
                </View>

                <View style={styles.overlayTextWr}>
                  <Text style={styles.overlayText}>Text Note</Text>
                </View>
              </View>
            </Animated.View>

            <View style={styles.svgWrStyles}>
              <AnimatedSvg
                style={[styles.svgStyles,animationStyles.svgAnime]}
                width={width}
                height={height * 0.95}
              >
                <Path {...{d:curve}} fill="white" stroke='#ADD8E6'     />
              </AnimatedSvg>
            </View>

            <View style={StyleSheet.absoluteFill}>
            <TabBar
              estyle={animationStyles.tabAnimeStyle}
              mainStyle={animationStyles.centerBtn}
            />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    // backgroundColor: "deeppink",
    // justifyContent: "flex-end",
  },
  content: {
    marginTop: 22,
  },
  contentText: {
    textAlign: "center",
  },
  animeText: {
    fontSize: 55,
    color: "#000080",
    textAlign: "center",
    // marginTop: MAX_VERTICAL_RANGE ,
    fontWeight: "700",
    position: "absolute",
    left: Dimensions.get("window").width / 3,
    bottom: MAX_VERTICAL_RANGE,
  },
  animeTextWrapper: {
    height: "100%",
    // backgroundColor:'gold',
    // justifyContent:'center',
    alignItems: "center",
  },
  overlayTextWr: {
    marginVertical: 20,
  },
  overlayText: {
    color: "#fff",
  },
  svgStyles: {
    // zIndex: 75,
    backgroundColor:"#ADD8E6",
    justifyContent: "center",
    alignItems: "center",
    // height: 128,
    // flex: 1,
    position:'absolute',
    bottom:2,
    left:0,
    // left:0.25 * width,
    transform:[{scale: 0}]
    // paddingBottom:40,
      
  },
  svgWrStyles: {
    zIndex: 375,
    // backgroundColor: "pink",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // height: 128,
    position:'absolute',
    bottom:6,
    left:0,
    // width: width,
  },
});

export default TabBar3Screen;
