import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AnimationScreens = [
  {
    screenRoute: "TabBars",
    screentext: "Tab Bars Animations",
  }
];

const NavItem = ({handlePress,routeGiven,routeText}) => {

  const handleClick = ():void => {
    // console.log('clicked home route');
    handlePress(routeGiven);
  }
  return (
    <TouchableOpacity style={styles.navItem} onPress={handleClick}>
      <View style={styles.navItemLogoWrapper}>
        <AntDesign
          name="arrowright"
          size={20}
          color="black"
          style={styles.navItemLogo}
        />
      </View>
      <View style={styles.navItemTitleWrapper}>
        <Text style={styles.navItemTitle}>{routeText}</Text>
      </View>
    </TouchableOpacity>
  );
};



const HomeScreen = ({ navigation }) => {
  const handleClick = (routeGiven: string) => {
    navigation.navigate(routeGiven);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.nav}>
        {
          AnimationScreens.map((screenItem,index) => {
            return <NavItem handlePress={handleClick} key={index} routeGiven={screenItem.screenRoute} routeText={screenItem.screentext}/>
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  nav: {
    backgroundColor:'#f2f2f2',
    padding:10,
    // margin:12,
  },
  navItem: {
    flexDirection: "row",
    backgroundColor:'lightgreen',
    margin:10,
    padding:2,
    borderRadius:8,
  },
  navItemTitle: {
    fontSize:16,
  },
  navItemTitleWrapper: {},
  navItemLogoWrapper: {
    marginRight:12,
    marginLeft:6,
  },
  navItemLogo: {},
});

export default HomeScreen;
