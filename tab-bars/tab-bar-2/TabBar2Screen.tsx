import React from 'react';
import {  StyleSheet, View,Text } from "react-native";

const TabBar2Screen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>Click on the tab  buttons to see the animation effect</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
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
});

export default TabBar2Screen;