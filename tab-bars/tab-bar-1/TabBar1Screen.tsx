import React from 'react';
import {  StyleSheet, View ,Text} from "react-native";
import TabBar from './components/TabBar';

const TabBar1Screen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>Click on the tab  buttons to see the animation effect</Text>
      </View>
      <TabBar/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#eb3",
    // justifyContent: "flex-end",
  },
  content:{
    marginTop:22,
  },
  contentText:{
    textAlign:'center',
  },
});

export default TabBar1Screen