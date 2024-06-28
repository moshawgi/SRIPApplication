import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SignUp from './Components/SignUpComponent';
import SignIn from './Components/SignInComponent';
import MarketAdd from './Components/MarketAddComponent';
import ProfilePage from "./Components/ProfileComponent";
import MessageComponent from './Components/MessageComponent';
import Chat from './Components/ChatComponent';
import ProfileSearch from './Components/ProfileSearchComponent'
import MarketList from './Components/MarketListComponent';
import Market from './Components/MarketComponent.js';
import DashBoard from './Components/DashBoardComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MyTab = () => {
  return (
      <Tab.Navigator initialRouteName='Dashboard' screenOptions={{headerShown: false}}>
        <Tab.Screen name = "Dashboard" component = {DashBoard} options = {{title: 'Map', tabBarIcon: () => {return <Ionicons name="map-outline" size={20}/>}}}/>
        <Tab.Screen name = "Market Add" component = {MarketAdd} options = {{title: 'Market Add', tabBarIcon: () => {return <Ionicons name="storefront-outline" size={20}/>}}}/>
        <Tab.Screen name = "Messages" component = {MessageComponent} options = {{title: 'Messages', tabBarIcon: () => {return <Ionicons name="chatbubble-outline" size={20}/>}}}/>
        <Tab.Screen name = "Profile Search" component = {ProfileSearch} options = {{title: 'Search', tabBarIcon: () => {return <Ionicons name="people-outline" size={20}/>}}}/>
        <Tab.Screen name = "Settings" component = {ProfilePage} options = {{title: 'Settings', tabBarIcon: () => {return <Ionicons name="settings-outline" size={20}/>}}}/>
      </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={SignUp} options={{title: 'Register', headerShown: false}}/>
        <Stack.Screen name="Login" component={SignIn} options={{title: 'Login', headerShown: false}}/>
        <Stack.Screen name = "Chat" component = {Chat} options = {{title: 'Chat'}}/>
        <Stack.Screen name = "Market" component = {Market} options = {{title: 'View Market'}}/>
        <Stack.Screen name="Dashboard" component={MyTab} options = {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;