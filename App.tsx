import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import TabBar from './tab-bars/tab-bar-1/components/TabBar';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // // justifyContent: 'center',
    // backgroundColor: "#eb3",
    // justifyContent: "flex-end",
  },
});
