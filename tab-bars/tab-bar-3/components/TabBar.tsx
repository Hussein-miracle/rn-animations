import React from "react";
// import { Dimensions } from "react-native";
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated,{ useAnimatedGestureHandler} from "react-native-reanimated";

import StaticTabBar from "./StaticTabBar";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const MAX_VERTICAL_RANGE = height * 0.25;

const TabBar = ({ estyle ,mainStyle}) => {
  // const animationGestureHandler = useAnimatedGestureHandler({
  //   onStart: (event, context) => {},
  //   onActive: (event, context) => {},
  //   onEnd: (event, context) => {},
  //   onCancel: (event, context) => {},
  //   onFinish: (event, context, isCanceledOrFailed) => {},
  // });
  return (
    <Animated.View
      style={[{
          position: "absolute",
          bottom: 0,
          // left:0
          // backgroundColor: "green",
          width,
        }
      ]}
    >
      <View style={styles.tabMain}>
        <StaticTabBar estyle={estyle} mainStyle={mainStyle}/>
      </View>

      <SafeAreaView style={styles.SA} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabMain: {
    backgroundColor: "#fff",
    // position:'absolute',
    // bottom:0,
  },
  SA: {},
});
export default TabBar;
