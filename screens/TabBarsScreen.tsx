import React from "react";
import { StyleSheet, View, Text ,TouchableOpacity} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

interface Screen{
  screenRoute:string;
  screenText:string;
}
const screens:Screen[] = [
  {
    screenRoute: "TabBar1",
    screenText: "Tab Bar Animation 1",
  },
  {
    screenRoute: "TabBar2",
    screenText: "Tab Bar Animation 2",
  },
];

const NavItem = ({handlePress,routeGiven,routeText}) => {

  const handleClick = ():void => {
    // console.log('clicked');
    handlePress(routeGiven);
  }
  return (
    <TouchableOpacity style={styles.navItem} onPress={handleClick}>
      <View style={styles.navItemLogoWrapper}>
        <AntDesign
          name="arrowright"
          size={20}
          color="#f2f2f2"
          style={styles.navItemLogo}
        />
      </View>
      <View style={styles.navItemTitleWrapper}>
        <Text style={styles.navItemTitle}>{routeText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TabBarsScreen = ({ navigation }) => {
  const handleClick = (routeGiven: string) => {
    navigation.navigate(routeGiven);
  };
  return <View style={styles.screen}>
      <View style={styles.nav}>
        {
        screens.map((screenItem:Screen,index:number) => {
            return <NavItem handlePress={handleClick} key={index} routeGiven={screenItem.screenRoute} routeText={screenItem.screenText}/>
          })
        }
      </View>
  </View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 4,
  },
  nav: {
    backgroundColor:'#f2f2f2',
    padding:10,
    // margin:12,
  },
  navItem: {
    flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor:'#212121',
    margin:10,
    padding:2,
    borderRadius:8,
  },
  navItemTitle: {
    color:'#f2f2f2',
    fontSize:16,
  },
  navItemTitleWrapper: {},
  navItemLogoWrapper: {
    marginRight:12,
    marginLeft:8,
  },
  navItemLogo: {},
});
export default TabBarsScreen;
