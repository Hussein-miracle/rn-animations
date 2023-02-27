import React from "react";
import { StyleSheet, View ,Text} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Tabbar from "./components/Tabbar";
import Backdrop from "./components/Backdrop";

const TabBar2Screen = () => {
  const open = useSharedValue(0);
  return (
    <View style={styles.screen}>
      {/* <View style={styles.content}>
        <Text style={styles.contentText}>Click on the tab  buttons to see the animation effect</Text>
      </View> */}
      <View style={styles.container}>
      <Backdrop open={open} />
      <Tabbar open={open} />
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  content:{
    marginTop:22,
  },
  contentText:{
    textAlign:'center',
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 32,
    alignItems: "center",
    backgroundColor: "#F5F7FE",
  },
});

export default TabBar2Screen;