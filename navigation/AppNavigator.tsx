import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/HomeScreen';

import TabBarsScreen from '../screens/TabBarsScreen';
import TabBar1Screen from "../tab-bars/tab-bar-1/TabBar1Screen";
import TabBar2Screen from "../tab-bars/tab-bar-2/TabBar2Screen";
import TabBar3Screen from '../tab-bars/tab-bar-3/TabBar3Screen';




const Stack = createNativeStackNavigator();



// const TabBarsScreenStack = createNativeStackNavigator();

// const TabBarsScreenNavigator = () => {
//   return (
//     <TabBarsScreenStack.Navigator>
//       <TabBarsScreenStack.Screen name="TabBar1" component={TabBar1Screen} />
//     </TabBarsScreenStack.Navigator>
//   );
// };

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name='Animations' component={HomeScreen} options={{
          headerTitle:'React-Native Animations'
        }}/>

        <Stack.Screen name='TabBars' component={TabBarsScreen}/>
        <Stack.Screen name='TabBar1' component={TabBar1Screen}/>
        <Stack.Screen name='TabBar2' component={TabBar2Screen}/>
        <Stack.Screen name='TabBar3' component={TabBar3Screen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;