import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Waiting_Driver_Screen from "./Components/MapComponent"
import SignUp from './Components/SignUpComponent';
import SignIn from './Components/SignInComponent';
import DashBoard from './Components/DashBoardComponent';
import MarketAdd from './Components/MarketAddComponent';
import ProfilePage from "./Components/ProfileComponent";
import MessageComponent from './Components/MessageComponent';
import Chat from './Components/ChatComponent';

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
        <Stack.Screen name = "Profile" component = {ProfilePage} options = {{title: 'Profile Page'}}/>
        <Stack.Screen name = "Messages" component = {MessageComponent} options = {{title: 'Messages'}}/>
        <Stack.Screen name = "Chat" component = {Chat} options = {{title: 'Chat'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;