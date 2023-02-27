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
} from "react-native-reanimated";
import TabBar from "./components/TabBar";
import { TAB_HEIGHT ,TAB_WIDTH } from "./components/StaticTabBar";
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
console.log(W_2,'w2')

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const TabBar3Screen = () => {
  const right = shape.line()
    .x((d) => d[0])
    .y((d) => d[1])([
    [0, 0],
    [width, 0],
  ]);
  const left = shape
  .line()
  .x((d) => d[0])
  .y((d) => d[1])([
  [width + TAB_WIDTH , 0],
  [width * 2, 0],
  [width * 2, height],
  [0, height],
  [0, 0],
]);
  const curvedCenter = ``;
  const pathDir = `${left} ${curvedCenter} ${right}`;
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
        opacity: opacityValue,
      };
    }),

    tabAnimeStyle: useAnimatedStyle(() => {
      const opacityValue = interpolate(
        TABY.value,
        [0,  -TAB_HEIGHT],
        [1, 0],
        Extrapolate.CLAMP
      );
      // console.log(opacityValue,'tabYOps')
      // console.log(TABY.value, "atbY");
      return {
        opacity: opacityValue,
      };
    }),
    centerBtn:useAnimatedStyle(() => {
      const translationY = interpolate(
        TABY.value,
        [0, -MAX_VERTICAL_RANGE],
        [0, -MAX_VERTICAL_RANGE / 2],
        Extrapolate.CLAMP
      );

      // console.log(translationY,'tsY')
      return {
        // opacity: opacityValue,
        transform:[{translateY:translationY}],
        zIndex:30,
      };
    }),
    blueScreenStyles:useAnimatedStyle(() => {
      const opValue = interpolate(
        TABY.value,
        [0, -MAX_VERTICAL_RANGE / 6],
        [0, 1],
        Extrapolate.CLAMP
      );

      // console.log(opValue,'opValue');
      return {
        opacity:opValue,
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
            {/* <Animated.View
              style={[{
                backgroundColor: "#ADD8E6",
                width: "100%",
                position: "absolute",
                // bottom: TAB_HEIGHT,
                zIndex: 10,
                height,
                justifyContent:'center',
                alignItems:'center',
              },animationStyles.blueScreenStyles]}
            >
<View style={{marginTop:W_2}}>
<View style={styles.overlayTextWr}>
              <Text style={styles.overlayText}>Reminder</Text>
</View>
<View style={styles.overlayTextWr}>
              <Text style={styles.overlayText}>Camera</Text>
</View>
<View style={styles.overlayTextWr}>

              <Text style={styles.overlayText}>Attachment</Text>
</View >

<View style={styles.overlayTextWr}>

              <Text style={styles.overlayText}>Text Note</Text>
</View>
</View>

            </Animated.View> */}
            <AnimatedSvg width={width / 3} >
              <Path d={pathDir} fill="gold" />
            </AnimatedSvg>
            <TabBar estyle={animationStyles.tabAnimeStyle} mainStyle={animationStyles.centerBtn}/>
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
  overlayTextWr:{
    marginVertical:20,
  },
  overlayText:{
    color:'#fff',
  }
});

export default TabBar3Screen;
