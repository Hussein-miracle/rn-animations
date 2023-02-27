import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
  Feather,
  Ionicons,
  // Icon
} from "@expo/vector-icons";
// import { Icon } from "@expo/vector-icons/build/createIconSet";
import Animated from 'react-native-reanimated';

// interface IICon{
//   Icon:  typeof MaterialCommunityIcons | typeof Octicons | typeof AntDesign | typeof Feather | typeof Ionicons
// }
interface ITab {
  bgColor: string;
  iconName: string;
  color: string;
  IconComponent: any;
  size:number;
}


const size = 24;
const TABS: ITab[] = [
  {
    bgColor: "white",
    iconName: "calendar-star",
    color: "#888",
    IconComponent: MaterialCommunityIcons,
    size,
  },
  {
    bgColor: "white",
    size,
    iconName: "search",
    color: "#888",
    IconComponent:  Octicons,
  },
  {
    bgColor: "#ADD8E6",
    iconName: "plus",
    size:38,
    color: "#fff",
    IconComponent: AntDesign,
  },
  {
    bgColor: "#fff",
    size,
    iconName: "zap",
    color: "#888",
    IconComponent: Feather,
  },
  {
    size,
    bgColor: "#fff",
    iconName: "md-settings-outline",
    color: "#888",
    IconComponent:Ionicons,
  },
];

const width = Dimensions.get("window").width;

const NUM_OF_TABS = 5;

const ACTION_MARGIN = 10;
const MARGIN = 15;
export const TAB_WIDTH = width / NUM_OF_TABS - MARGIN;
export const TAB_HEIGHT = 72;

const TabItem = ({ children ,extrastyle , index}) => {
  // console.log(estyle,'e');

  return (
    <TouchableWithoutFeedback style={[styles.tabItem]}>
      <Animated.View style={[styles.tab,extrastyle]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

const StaticTabBar = ({estyle,mainStyle}) => {
  return (
    <View style={styles.container}>
      {TABS.map(({ IconComponent, iconName , size,color ,bgColor}, index) => {
        const stylesNew = [{
          backgroundColor:bgColor,
        } ];

        if(index + 1 !== 3){
          stylesNew.push(estyle)
        }else{
          stylesNew.push(mainStyle)
        }
        return (
          <TabItem key={index} extrastyle={stylesNew} index={index}>
            <IconComponent name={iconName} size={size} {...{color}}  />
          </TabItem>
        );
      })}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width,
    // backgroundColor: "blue",
    height: TAB_HEIGHT,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    width: TAB_WIDTH,
    // marginHorizontal:2,
    height: TAB_WIDTH,
    borderRadius: TAB_WIDTH / 2,
  },
  tabItem: {
    ...StyleSheet.absoluteFillObject,

    // backgroundColor:'green',
  },
});

export default StaticTabBar;
