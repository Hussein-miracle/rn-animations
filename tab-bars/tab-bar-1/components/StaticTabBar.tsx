import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

interface Tab {
  name: string;
}

export const tabHeight = 64;

const width = Dimensions.get("window").width;

interface IStaticTabBar {
  tabs: Tab[];
  value: number;
  setValue: Function;
}

const StaticTabBar: React.FC<IStaticTabBar> = ({ tabs, value, setValue }) => {

  const tabWidth = width / tabs.length;

  const handlePress = (index: number) => {
    // console.log(index,'index');
    const val = - width + tabWidth * index
    // console.log(val,'val');
    setValue(val);
  };

  return (
    <View style={styles.container}>
      {tabs.map(({ name }, index) => {
        // console.log(name,'nam')
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handlePress(index)}
          >
            <View style={styles.tab}>
              {/* eslint-disable-next-line */}
              <Feather name={`${name}`} size={24} color="black" />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent:'space-between',
    alignItems: "center",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: tabHeight,
    width,
  },
});

export default StaticTabBar;
