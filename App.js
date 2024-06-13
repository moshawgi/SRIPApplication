import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Waiting_Driver_Screen from "./Components/MapComponent"
import SignUp from './Components/SignUpComponent';
import SignIn from './Components/SignInComponent';
import DashBoard from './Components/DashBoardComponent';
import MarketAdd from './Components/MarketAddComponent';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={SignUp} options={{title: 'Register'}}/>
        <Stack.Screen name="Dashboard" component={DashBoard} options={{title: 'Dashboard'}}/>
        <Stack.Screen name="Login" component={SignIn} options={{title: 'Login'}}/>
        <Stack.Screen name = "Map" component = {Waiting_Driver_Screen} options = {{title: 'Map'}}/>
        <Stack.Screen name = "Market Add" component = {MarketAdd} options = {{title: 'Market Add'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;