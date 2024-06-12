import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Waiting_Driver_Screen from "./MapComponent"
import SignUp from './SignUpComponent';
import SignIn from './SignInComponent';
import ProfileScreen from './ProfileScreenComponent';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={SignUp} options={{title: 'Register'}}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Login" component={SignIn} options={{title: 'Login'}}/>
        <Stack.Screen name = "Map" component = {Waiting_Driver_Screen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;